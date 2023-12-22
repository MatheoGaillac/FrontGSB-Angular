import {Component} from '@angular/core';
import {Form, FormControl, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {GsbFraisService} from "../../service/gsb-frais.service";
import {Frais} from "../../metier/frais";
import {AsyncPipe, CommonModule} from "@angular/common";
import {GsbShortService} from "../../service/gsb-short.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-affiche-frais',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './affiche-frais.component.html',
  styleUrl: './affiche-frais.component.css'
})
export class AfficheFraisComponent {
  public id_frais: number = 0;
  anneemois: FormControl = new FormControl('');
  nbjustificatifs: FormControl = new FormControl('');
  montantvalide: FormControl = new FormControl('');
  id_etat: FormControl = new FormControl('');

  constructor(route: ActivatedRoute, private frais_api: GsbFraisService, private etat_api: GsbShortService, private location: Location) {
    this.id_frais = parseInt(route.snapshot.paramMap.get('id_frais')!);
    console.log(this.id_frais);
    this.frais_api.chargeFrais(this.id_frais).subscribe(
      data => {
        let frais = new Frais(data);
        this.anneemois.setValue(frais.anneemois);
        this.nbjustificatifs.setValue(frais.nbjustificatifs);
        this.montantvalide.setValue(frais.montantvalide);
        this.id_etat.setValue(frais.id_etat);
      },
      error => console.log('Erreur appel API')
    );
    this.etat_api.getListeEtats();
  }

  getListeEtats() {
    return this.etat_api.appels_terminesEtat;
  }

  onSubmitFicheFrais() {
    this.frais_api.updateFrais(
      this.id_frais.valueOf(),
      this.anneemois.value,
      this.nbjustificatifs.value,
      this.montantvalide.value,
      this.id_etat.value
    );
  }

  onCancel() {
    this.location.back();
  }
}
