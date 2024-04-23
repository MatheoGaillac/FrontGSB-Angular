import { Component } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PraticienService } from '../../service/praticien.service';
import { Praticien } from '../../metier/praticien';
import { InviterService } from '../../service/inviter.service';
import { Inviter } from '../../metier/inviter';

@Component({
  selector: 'app-affiche-praticien',
  standalone: true,
  imports: [MenuComponent, CommonModule, MatIconModule],
  templateUrl: './affiche-praticien.component.html',
  styleUrl: './affiche-praticien.component.css',
})
export class AffichePraticienComponent {
  public id_praticien: number = 0;
  public praticien: Praticien | null = null;
  public inviter: Inviter | null = null;

  constructor(private praticien_api: PraticienService, private inviter_api: InviterService, private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.id_praticien = parseInt(this.route.snapshot.paramMap.get('id_praticien')!);
    this.praticien_api.getUnPraticien(this.id_praticien).subscribe(
      (data: Praticien) => {
        this.praticien = data;
      },
      error => console.log('Erreur appel API')
    );
    this.inviter_api.listInvitationPraticien(this.id_praticien)
  }

  getListInvitationPraticien() {
    return this.inviter_api.appels_termines;
  }
}