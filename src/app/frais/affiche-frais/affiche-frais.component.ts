import {Component} from '@angular/core';
import {Form, FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {GsbFraisService} from "../../service/gsb-frais.service";
import {Frais} from "../../metier/frais";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-affiche-frais',
  standalone: true,
  imports: [
    AsyncPipe
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

  constructor(route: ActivatedRoute, private frais_api: GsbFraisService) {
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
  }
}
