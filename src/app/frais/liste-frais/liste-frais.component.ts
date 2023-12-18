import { Component } from '@angular/core';
import {GsbFraisService} from "../../service/gsb-frais.service";
import {CommonModule} from "@angular/common";
import {MenuComponent} from "../../menu/menu.component";

@Component({
  selector: 'app-liste-frais',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './liste-frais.component.html',
  styleUrl: './liste-frais.component.css'
})
export class ListeFraisComponent {
  constructor(private frais_api: GsbFraisService) {
    this.frais_api.listeFraisDuVisiteur();
  }

  getListeFrais(){
    return this.frais_api.appels_termines;
  }
}
