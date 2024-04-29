import { Injectable } from '@angular/core';
import { Inviter } from '../metier/inviter';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GsbLoginService } from './gsb-login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InviterService {
  private inviter: Inviter = new Inviter();
  private _reponses = new BehaviorSubject<Inviter[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listInvitation: Inviter[] = [];
  public dataStore: { inviter: Inviter[] } = { inviter: [] };

  constructor(
    private http: HttpClient,
    private gsb_api: GsbLoginService,
    private router: Router
  ) {}

  listInvitationPraticien(id_praticien: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.gsb_api.recupererBearer(),
    });
    return this.http
      .get<Inviter[]>(
        'http://wsgsb.mgail.etu.lmdsio.com/api/praticien/getInvitationPraticien/' +
          id_praticien
      )
      .subscribe(
        (data) => {
          this.listInvitation = data;
          this._reponses.next(this.listInvitation);
        },
        (error) => console.log('Erreur appel API')
      );
  }

  chargeInvitation(id_praticien: number, id_activite_compl: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.gsb_api.recupererBearer(),
    });
    return this.http.get<Inviter>(
      'http://wsgsb.mgail.etu.lmdsio.com/api/praticien/getUneInvitation/' +
        id_praticien +
        '/' +
        id_activite_compl,
      { headers: headers }
    );
  }

  createInvitation(
    id_activite_compl: number,
    id_praticien: number,
    specialiste: string
  ) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.gsb_api.recupererBearer(),
    });

    const requestObject = {
      id_activite_compl: id_activite_compl,
      id_praticien: id_praticien,
      specialiste: specialiste,
    };

    this.http
      .post<Inviter>(
        `http://wsgsb.mgail.etu.lmdsio.com/api/praticien/addInvitation`,
        requestObject,
        { headers: headers }
      )
      .subscribe(
        (data) => {
          this.inviter = new Inviter(data);
          this.dataStore.inviter.push(this.inviter);
          this._reponses.next(this.dataStore.inviter);
          this.router.navigate(['praticiens/liste/' + id_praticien]);
          console.log('Appel réussi');
        },
        (error) => {
          if (error.status === 500) {
            console.log("L'invitation existe déjà !");
          } else {
            console.log('Erreur Appel API', error);
          }
        }
      );
  }

  updateInviter(
    id_activite_compl: number,
    id_praticien: number,
    old_id_activite_compl: number
  ) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.gsb_api.recupererBearer(),
    });

    const requestObject = {
      id_activite_compl: id_activite_compl,
      id_praticien: id_praticien,
      old_id_activite_compl: old_id_activite_compl,
    };

    this.http
      .post<Inviter>(
        `http://wsgsb.mgail.etu.lmdsio.com/api/praticien/updateInvitation/`,
        requestObject,
        { headers: headers }
      )
      .subscribe(
        (data) => {
          this.inviter = new Inviter(data);
          this.dataStore.inviter.push(this.inviter);
          this._reponses.next(this.dataStore.inviter);
          this.router.navigate(['praticiens/liste/' + id_praticien]);
          console.log('Appel réussi');
        },
        (error) => {
          console.log('Erreur Appel API', error);
        }
      );
  }

  deleteInvitation(idActiviteCompl: number, idPraticien: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.gsb_api.recupererBearer(),
    });

    return this.http.post<any>(
      `http://wsgsb.mgail.etu.lmdsio.com/api/praticien/deleteInvitation`,
      { id_activite_compl: idActiviteCompl, id_praticien: idPraticien },
      { headers: headers }
    );
  }
}
