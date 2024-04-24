import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InviterService } from '../../service/inviter.service';
import { Inviter } from '../../metier/inviter';
import { AsyncPipe, CommonModule, Location } from '@angular/common';
import { Praticien } from '../../metier/praticien';
import { GsbShortService } from '../../service/gsb-short.service';

@Component({
  selector: 'app-modifier-invitation',
  standalone: true,
  imports: [AsyncPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './modifier-invitation.component.html',
  styleUrl: './modifier-invitation.component.css',
})
export class ModifierInvitationComponent {
  public id_praticien: number = 0;
  public old_id_activite_compl: number = 0;
  id_activite_compl: FormControl = new FormControl('');
  praticien: Praticien | undefined;

  constructor(
    route: ActivatedRoute,
    private inviter_api: InviterService,
    private short_api: GsbShortService,
    private location: Location
  ) {
    this.id_praticien = parseInt(route.snapshot.paramMap.get('id_praticien')!);
    this.old_id_activite_compl = parseInt(
      route.snapshot.paramMap.get('id_activite_compl')!
    );
    this.inviter_api
      .chargeInvitation(this.id_praticien, this.old_id_activite_compl)
      .subscribe(
        (data) => {
          let inviter = new Inviter(data);
          this.id_activite_compl.setValue(inviter.id_activite_compl);
          this.praticien = inviter.praticien;
        },
        (error) => console.log('Erreur appel API')
      );
      this.short_api.getListeActivite();
  }

  getListeActivite() {
    return this.short_api.appels_terminesActivite;
  }

  onSubmitFicheInviter() {
    this.inviter_api.updateInviter(
      this.id_activite_compl.value,
      this.id_praticien.valueOf(),
      this.old_id_activite_compl.valueOf()
    );
  }

  onCancel() {
    this.location.back();
  }
}
