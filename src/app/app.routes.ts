import {CanActivate, CanActivateFn, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ListeFraisComponent} from "./frais/liste-frais/liste-frais.component";
import {ListPraticiensComponent} from "./praticiens/list-praticiens/list-praticiens.component";
import {HomeComponent} from "./home/home.component";
import {GsbLoginService} from "./service/gsb-login.service";
import {inject} from "@angular/core";
import {AfficheFraisComponent} from "./frais/affiche-frais/affiche-frais.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'frais/liste', component: ListeFraisComponent, canActivate: [authentificationGuard()]},
  {path: 'praticiens/liste', component: ListPraticiensComponent, canActivate: [authentificationGuard()]},
  {path: 'frais/liste/:id_frais', component: AfficheFraisComponent, canActivate: [authentificationGuard()]},
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
