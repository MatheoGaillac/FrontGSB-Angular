import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Etat} from "../metier/etat";
import {Specialites} from "../metier/specialites";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GsbLoginService} from "./gsb-login.service";
import {Router} from "@angular/router";
import { ActiviteCompl } from '../metier/activite-compl';
import {Praticien} from "../metier/praticien";

@Injectable({
  providedIn: 'root'
})
export class GsbShortService {

  private etat: Etat = new Etat;
  private activiteCompl: ActiviteCompl = new ActiviteCompl;
  private Specialites: Specialites = new Specialites;
  private Praticien: Praticien = new Praticien();
  private _reponsesEtat = new BehaviorSubject<Etat[]>([]);
  private _responsesActivite = new BehaviorSubject<ActiviteCompl[]>([]);
  private _responsesSpecialites = new BehaviorSubject<Specialites[]>([]);
  private _responsesPraticien = new BehaviorSubject<Praticien[]>([]);
  readonly appels_terminesEtat = this._reponsesEtat.asObservable();
  readonly appels_terminesActivite = this._responsesActivite.asObservable();
  readonly appels_terminesSpecialites = this._responsesSpecialites.asObservable();
  readonly appels_terminesPraticien = this._responsesPraticien.asObservable();
  public listeEtat: Etat[] = [];
  public listeActivite: ActiviteCompl[] = [];
  public listeSpecialites: Specialites[] = [];
  public listeVille: Praticien[] = [];

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

  getListeSpecialites() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + this.gsb_api.recupererBearer()
    });
    return this.http.get<Specialites[]>('http://wsgsb.mgail.etu.lmdsio.com/api/praticien/getSpecialites',
      {headers: headers}).subscribe(
      data => {
        this.listeSpecialites = data;
        this._responsesSpecialites.next(this.listeSpecialites);
        console.log("Appel API liste Specialités Réussis")
      },
      error => console.log("Erreur Appel API liste Etats")
    )
  }

  getVilles() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + this.gsb_api.recupererBearer()
    });
    return this.http.get<Praticien[]>('http://wsgsb.mgail.etu.lmdsio.com/api/praticien/getVille',
      {headers: headers}).subscribe(
      data => {
        this.listeVille = data;
        this._responsesPraticien.next(this.listeVille);
        console.log("Appel API liste Specialités Réussis")
      },
      error => console.log("Erreur Appel API liste Etats")
    )
  }
}
