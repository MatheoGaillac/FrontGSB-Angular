import { Component } from '@angular/core';
import {PraticienService} from "../../service/praticien.service";
import {Router} from "@angular/router";
import {GsbShortService} from "../../service/gsb-short.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-list-praticiens-criteres',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './list-praticiens-criteres.component.html',
  styleUrl: './list-praticiens-criteres.component.css'
})
export class ListPraticiensCriteresComponent {
  id_specialite: FormControl = new FormControl('');
  code_postal: FormControl = new FormControl('');
  public praticiens: any;
  constructor(
    private praticien_api: PraticienService,
    private short_api: GsbShortService,
    private router: Router
  ) {
    this.short_api.getListeSpecialites();
    this.short_api.getVilles();
  }

  getListeSpecialites() {
    return this.short_api.appels_terminesSpecialites;
  }
  getListeVilles() {
    return this.short_api.appels_terminesPraticien;
  }


  afficherPraticiens() {
    const specialites = this.id_specialite.value;
    const villes = this.code_postal.value;
    this.praticiens = this.praticien_api.listePraticiensCriteres(villes, specialites);
  }
}
