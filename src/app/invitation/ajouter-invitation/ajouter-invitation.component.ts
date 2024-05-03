import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InviterService } from '../../service/inviter.service';
import { GsbShortService } from '../../service/gsb-short.service';
import { AsyncPipe, CommonModule, Location } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PraticienService } from '../../service/praticien.service';

@Component({
  selector: 'app-ajouter-invitation',
  standalone: true,
  imports: [AsyncPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './ajouter-invitation.component.html',
  styleUrl: './ajouter-invitation.component.css',
})
export class AjouterInvitationComponent {
  id_activite_compl: FormControl = new FormControl('');
  id_praticien: FormControl = new FormControl('');
  specialiste: FormControl = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private inviter_api: InviterService,
    private praticien_api: PraticienService,
    private short_api: GsbShortService,
    private location: Location
  ) {
    this.short_api.getListeActivite();
    this.praticien_api.getListePraticiens();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idPraticien = params.get('id_praticien');
      if (idPraticien) {
        this.id_praticien.setValue(idPraticien);
      }
    });
  }

  getListeActivite() {
    return this.short_api.appels_terminesActivite;
  }

  getListePraticiens() {
    return this.praticien_api.appels_termines;
  }

  onSubmitFicheInviter() {
    this.inviter_api.createInvitation(
      this.id_activite_compl.value,
      this.id_praticien.value,
      this.specialiste.value
    );
  }

  onCancel() {
    this.location.back();
  }
}
