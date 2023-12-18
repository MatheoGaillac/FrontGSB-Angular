import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Frais} from "../metier/frais";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GsbLoginService} from "./gsb-login.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class GsbFraisService {

  private frais: Frais = new Frais;

  private _reponses = new BehaviorSubject<Frais[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listeFrais: Frais[] = [];
  constructor(private http: HttpClient, private gsb_api: GsbLoginService) { }

  listeFraisDuVisiteur(){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupererBearer()
    });
    return this.http.get<Frais[]>('http://wsgsb.mgail.etu.lmdsio.com/api/frais/getFrais/' +
    this.gsb_api.visiteurId(), {headers: headers}).subscribe(
      data => {
        this.listeFrais = data;
        this._reponses.next(this.listeFrais);
        console.log("success");
      },
      error => console.log('Erreur appel API')
    );
  }
}
