import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Etat} from "../metier/etat";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GsbLoginService} from "./gsb-login.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GsbShortService {

  private etat: Etat = new Etat;
  private _reponsesEtat = new BehaviorSubject<Etat[]>([]);
  readonly appels_terminesEtat = this._reponsesEtat.asObservable();
  public listeEtat: Etat[] = [];

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbLoginService) {
  }

  getListeEtats() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + this.gsb_api.recupererBearer()
    });
    return this.http.get<Etat[]>('http://wsgsb.mgail.etu.lmdsio.com/api/frais/getEtats/',
      {headers: headers}).subscribe(
        data => {
          this.listeEtat = data;
          this._reponsesEtat.next(this.listeEtat);
          console.log("Appel API liste Etats Réussis")
        },
      error => console.log("Erreur Appel API liste Etats")
    )
  }
}
