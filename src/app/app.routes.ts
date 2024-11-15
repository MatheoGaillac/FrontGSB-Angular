import {CanActivate, CanActivateFn, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ListeFraisComponent} from "./frais/liste-frais/liste-frais.component";
import {ListPraticiensComponent} from "./praticiens/list-praticiens/list-praticiens.component";
import {HomeComponent} from "./home/home.component";
import {GsbLoginService} from "./service/gsb-login.service";
import {inject} from "@angular/core";
import {AfficheFraisComponent} from "./frais/affiche-frais/affiche-frais.component";
import { AffichePraticienComponent } from './praticiens/affiche-praticien/affiche-praticien.component';
import { ModifierInvitationComponent } from './invitation/modifier-invitation/modifier-invitation.component';
import { AjouterInvitationComponent } from './invitation/ajouter-invitation/ajouter-invitation.component';
import {
  ListPraticiensCriteresComponent
} from "./praticiens/list-praticiens-criteres/list-praticiens-criteres.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'frais/liste', component: ListeFraisComponent, canActivate: [authentificationGuard()]},
  {path: 'frais/liste/:id_frais', component: AfficheFraisComponent, canActivate: [authentificationGuard()]},
  {path: 'praticiens/listeCriteres', component: ListPraticiensCriteresComponent, canActivate: [authentificationGuard()]},
  {path: 'praticiens/liste', component: ListPraticiensComponent, canActivate: [authentificationGuard(), adminGuard()]},
  {path: 'praticiens/liste/:id_praticien', component: AffichePraticienComponent, canActivate: [authentificationGuard(), adminGuard()]},
  {path: 'praticiens/modifier/:id_praticien/:id_activite_compl', component: ModifierInvitationComponent, canActivate: [authentificationGuard(), adminGuard()]},
  {path: 'invitation/ajouter', component: AjouterInvitationComponent, canActivate: [authentificationGuard(), adminGuard()]},
  {path: 'invitation/ajouter/:id_praticien', component: AjouterInvitationComponent, canActivate: [authentificationGuard(), adminGuard()]},
  {path: 'home', component: HomeComponent},
];

export function authentificationGuard(): CanActivateFn {
  return () => {
    const loginService: GsbLoginService = inject(GsbLoginService);

    if (loginService.visiteurId() > 0) {
      return true;
    } else {
      console.log('Il faut vous connecter');
    }
    return false;
  }
}

export function adminGuard(): CanActivateFn {
  return () => {
    const loginService: GsbLoginService = inject(GsbLoginService);

    if (loginService.visiteurId() > 0) {
      if (loginService.visiteurType() === 'A') {
        return true;
      } else {
        console.log('Accès refusé. Vous devez être un administrateur.');
      }
    } else {
      console.log('Il faut vous connecter');
    }
    return false;
  }
}

