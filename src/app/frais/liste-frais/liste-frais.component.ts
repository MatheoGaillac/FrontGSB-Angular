import { Component } from '@angular/core';
import {GsbFraisService} from "../../service/gsb-frais.service";
import {CommonModule} from "@angular/common";
import {MenuComponent} from "../../menu/menu.component";
import { MatIconModule } from '@angular/material/icon';
import {Router} from "@angular/router";

@Component({
  selector: 'app-liste-frais',
  standalone: true,
  imports: [MenuComponent, CommonModule, MatIconModule],
  templateUrl: './liste-frais.component.html',
  styleUrl: './liste-frais.component.css'
})
export class ListeFraisComponent {
  constructor(private frais_api: GsbFraisService, private router: Router) {
    this.frais_api.listeFraisDuVisiteur();
  }

  getListeFrais(){
    return this.frais_api.appels_termines;
  }

  afficherDetailsFrais(id_frais: number) {
    this.router.navigate(['/frais/liste', id_frais]);
  }
}
