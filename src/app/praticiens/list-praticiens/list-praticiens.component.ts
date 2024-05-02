import {Component, OnInit} from '@angular/core';
import {MenuComponent} from '../../menu/menu.component';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {PraticienService} from '../../service/praticien.service';

@Component({
  selector: 'app-list-praticiens',
  standalone: true,
  imports: [MenuComponent, CommonModule, MatIconModule],
  templateUrl: './list-praticiens.component.html',
  styleUrl: './list-praticiens.component.css',
})
export class ListPraticiensComponent {
  critere: string = '';

  constructor(
    private praticien_api: PraticienService,
    private router: Router
  ) {
    this.praticien_api.listSearchPraticiens("");
  }

  onSearchChange(event: any) {
    this.critere = event.target.value;
    this.praticien_api.listSearchPraticiens(this.critere);
  }

  getListePraticiens() {
    return this.praticien_api.appels_termines;
  }

  afficherDetailsPraticien(id_praticien: number) {
    this.router.navigate(['/praticiens/liste', id_praticien]);
  }
}
