import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Etat} from "../metier/etat";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GsbLoginService} from "./gsb-login.service";
import {Router} from "@angular/router";
import { ActiviteCompl } from '../metier/activite-compl';

@Injectable({
  providedIn: 'root'
})
export class GsbShortService {

  private etat: Etat = new Etat;
  private activiteCompl: ActiviteCompl = new ActiviteCompl;
  private _reponsesEtat = new BehaviorSubject<Etat[]>([]);
  private _responsesActivite = new BehaviorSubject<ActiviteCompl[]>([]);
  readonly appels_terminesEtat = this._reponsesEtat.asObservable();
  readonly appels_terminesActivite = this._responsesActivite.asObservable();
  public listeEtat: Etat[] = [];
  public listeActivite: ActiviteCompl[] = [];

  constructor(private http: HttpClient, private router: Router, private gsb_api: GsbLoginService) {
  }

  getListeEtats() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + this.gsb_api.recupererBearer()
    });
    return this.http.get<Etat[]>('http://wsgsb.mgail.etu.lmdsio.com/api/frais/getEtats',
      {headers: headers}).subscribe(
        data => {
          this.listeEtat = data;
          this._reponsesEtat.next(this.listeEtat);
          console.log("Appel API liste Etats Réussis")
        },
      error => console.log("Erreur Appel API liste Etats")
    )
  }

  getListeActivite() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + this.gsb_api.recupererBearer()
    });
    return this.http.get<ActiviteCompl[]>('http://wsgsb.mgail.etu.lmdsio.com/api/praticien/getActiviteCompl',
      {headers: headers}).subscribe(
        data => {
          this.listeActivite = data;
          this._responsesActivite.next(this.listeActivite);
          console.log("Appel API liste Activité Réussis")
        },
      error => console.log("Erreur Appel API liste Etats")
    )
  }
}
