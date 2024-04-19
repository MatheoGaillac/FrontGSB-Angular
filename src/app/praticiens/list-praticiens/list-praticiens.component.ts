import { Component } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import { PraticienService } from '../../service/praticien.service';

@Component({
  selector: 'app-list-praticiens',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './list-praticiens.component.html',
  styleUrl: './list-praticiens.component.css'
})
export class ListPraticiensComponent {
  constructor(private praticien_api: PraticienService, private router: Router){
    this.praticien_api.listSearchPraticiens("Laurent");
  }

  getListePraticiens(){
    return this.praticien_api.appels_termines;
  }
}
