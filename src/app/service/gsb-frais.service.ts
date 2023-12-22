import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Frais} from "../metier/frais";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GsbLoginService} from "./gsb-login.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GsbFraisService {

  private frais: Frais = new Frais;

  private _reponses = new BehaviorSubject<Frais[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listeFrais: Frais[] = [];
  public dataStore: { frais: Frais[] } = {frais: []};

  constructor(private http: HttpClient, private gsb_api: GsbLoginService, private router: Router) {
  }

  listeFraisDuVisiteur() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupererBearer()
    });
    return this.http.get<Frais[]>('http://wsgsb.mgail.etu.lmdsio.com/api/frais/getFrais/' +
      this.gsb_api.visiteurId(), {headers: headers}).subscribe(
      data => {
        this.listeFrais = data;
        this._reponses.next(this.listeFrais);
      },
      error => console.log('Erreur appel API')
    );
  }

  chargeFrais(id_frais: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupererBearer()
    });
    return this.http.get<Frais>('http://wsgsb.mgail.etu.lmdsio.com/api/frais/getUnFrais/' +
      id_frais, {headers: headers})
  }

  updateFrais(id_frais: number, anneemois: string, nbjustificatifs: number, montantvalide: number, id_etat: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.gsb_api.recupererBearer()
    });

    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);

    const requestObject = {
      "id_frais": id_frais,
      "nbjustificatifs": nbjustificatifs,
      "montantvalide": montantvalide,
      "anneemois": anneemois,
      "id_etat": id_etat,
      "id_visiteur": this.gsb_api.visiteurId(),
      "datemodification": formattedDate
    };

    this.http.post<Frais>(`http://wsgsb.mgail.etu.lmdsio.com/api/frais/updateFrais`
      , requestObject, {headers: headers})
      .subscribe(
        data => {
          this.frais = new Frais(data);
          this.dataStore.frais.push(this.frais);
          this._reponses.next(this.dataStore.frais);
          this.router.navigate(['frais/liste']);
          console.log("Appel réussi");
        },
        error => {
          console.log("Erreur Appel API", error);
        }
      );
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
