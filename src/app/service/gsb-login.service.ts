import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../metier/login";
import {Router} from "@angular/router";
import {Visiteur} from "../metier/visiteur";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GsbLoginService {

  private login: Login = new Login;
  private _responses = new BehaviorSubject<Login[]>([]);
  private dataStore: {login: Login[]}={login:[]};
  readonly appels_termines = this._responses.asObservable();
  constructor(private http: HttpClient, private router: Router) { }

  serviceEnvoieLogin(email: string, password: string){
    const requestObject = new Visiteur({"login": email, "password": password});
    return this.http.post<Login>('http://wsgsb.mgail.etu.lmdsio.com/api/login', requestObject).
      subscribe(
        data => {
          this.login = new Login(data);
          this.dataStore.login.push(data);
          this._responses.next(this.dataStore.login);
          this.router.navigate(['/frais/liste']);
        },
      error => console.log('Erreur appel API')
    )
  }

  recupererBearer(): string {
    return this.login.access_token;
  }

  visiteurId(): number {
    return this.login.visiteur.id_visiteur;
  }
}
