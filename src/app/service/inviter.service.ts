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
  private _reponses = new BehaviorSubject<Inviter[]>([]);
  readonly appels_termines = this._reponses.asObservable();
  public listInvitation: Inviter[] = [];

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
        'http://127.0.0.1:8000/api/praticien/getInvitationPraticien/' + id_praticien
      )
      .subscribe(
        (data) => {
          this.listInvitation = data;
          this._reponses.next(this.listInvitation);
        },
        (error) => console.log('Erreur appel API')
      );
  }
}
