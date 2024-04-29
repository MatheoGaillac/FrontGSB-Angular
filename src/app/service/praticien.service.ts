import { Injectable } from '@angular/core';
import { Praticien } from '../metier/praticien';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GsbLoginService } from './gsb-login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PraticienService {
  private praticien: Praticien = new Praticien();
  private _reponses = new BehaviorSubject<Praticien[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listPraticien: Praticien[] = [];

  constructor(
    private http: HttpClient,
    private gsb_api: GsbLoginService,
    private router: Router
  ) {}

  listSearchPraticiens(critere: String) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.gsb_api.recupererBearer(),
    });
    return this.http
      .get<Praticien[]>(
        'http://wsgsb.mgail.etu.lmdsio.com/api/praticien/getPraticien/' + critere
      )
      .subscribe(
        (data) => {
          this.listPraticien = data;
          this._reponses.next(this.listPraticien);
        },
        (error) => console.log('Erreur appel API', error)

      );
  }

  getUnPraticien(id_praticien: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupererBearer()
    });
    return this.http.get<Praticien>('http://wsgsb.mgail.etu.lmdsio.com/api/praticien/getPraticienByID/' +
    id_praticien, {headers: headers})
  }

  getListePraticiens() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + this.gsb_api.recupererBearer()
    });
    return this.http.get<Praticien[]>('http://wsgsb.mgail.etu.lmdsio.com/api/praticien/getAllPraticiens',
      {headers: headers}).subscribe(
        data => {
          this.listPraticien = data;
          this._reponses.next(this.listPraticien);
          console.log("Appel API liste Praticiens Réussis")
        },
      error => console.log("Erreur Appel API liste Praticiens")
    )
  }
}
