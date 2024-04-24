import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../metier/login';
import { Router } from '@angular/router';
import { Visiteur } from '../metier/visiteur';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GsbLoginService {
  private login: Login = new Login();
  private _responses = new BehaviorSubject<Login[]>([]);
  private isLogin = false;
  public errorMessage: string = '';
  private dataStore: { login: Login[] } = { login: [] };
  readonly appels_termines = this._responses.asObservable();
  constructor(private http: HttpClient, private router: Router) {
    this.loadLoginState();
  }

  serviceEnvoieLogin(email: string, password: string) {
    const requestObject = new Visiteur({ login: email, password: password });
    return this.http
      .post<Login>('http://127.0.0.1:8000/api/login', requestObject)
      .subscribe(
        (data) => {
          this.login = new Login(data);
          this.dataStore.login.push(data);
          this.isLogin = true;
          this.saveLoginState();
          this._responses.next(this.dataStore.login);
          this.router.navigate(['/frais/liste']);
        },
        (error) => {
          if (error.status === 401) {
            this.errorMessage =
              "Erreur d'authentification. Mot de passe / identifiant incorrect.";
          } else if (error.status === 403) {
            this.errorMessage =
              "Autorisation refusée. Vous n'avez pas les droits nécessaires.";
          } else {
            this.errorMessage =
              "Une erreur inattendue s'est produite lors de la connexion.";
          }
        }
      );
  }

  recupererBearer(): string {
    return this.login.access_token;
  }

  visiteurId(): number {
    return this.login.visiteur.id_visiteur;
  }

  visiteurType(): string {
    return this.login.visiteur.type_visiteur;
  }

  public getIsLogin(): boolean {
    return this.isLogin;
  }

  getErrorStatus(): string {
    return this.errorMessage;
  }

    // Enregistre l'état de connexion dans le stockage local
    private saveLoginState() {
      localStorage.setItem('loginState', JSON.stringify(this.login));
      localStorage.setItem('isLogin', JSON.stringify(this.isLogin));
    }
  
    // Charge l'état de connexion depuis le stockage local
    private loadLoginState() {
      const savedLogin = localStorage.getItem('loginState');
      const isLogin = localStorage.getItem('isLogin');
    
      if (savedLogin) {
        this.login = JSON.parse(savedLogin);
      }
    
      if (isLogin) {
        this.isLogin = JSON.parse(isLogin);
      }
    }

  logout() {
    this.login = new Login();
    this.dataStore.login = [];
    this._responses.next(this.dataStore.login);
    this.isLogin = false;
    localStorage.removeItem('loginState'); // Supprime l'état de connexion du stockage local
    localStorage.removeItem('isLogin');
    this.router.navigate(['/login']);
  }
}
