import {Injectable} from '@angular/core';
import {Praticien} from "../metier/praticien";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GsbLoginService} from "./gsb-login.service";
import {Router} from "@angular/router";
import {Frais} from "../metier/frais";
import {Etat} from "../metier/etat";

@Injectable({
  providedIn: 'root'
})
export class PraticienService {

  private praticien: Praticien = new Praticien;
  private _reponses = new BehaviorSubject<Praticien[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listPraticien: Praticien[] = [];
  public dataStore: { praticien: Praticien[] } = {praticien: []};

  constructor(private http: HttpClient, private gsb_api: GsbLoginService, private router: Router) {
  }

}
