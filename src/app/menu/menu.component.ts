import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CommonModule} from '@angular/common';
import {GsbLoginService} from "../service/gsb-login.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private gsbLoginService: GsbLoginService) {
  }

  isLoggedIn(): boolean {
    return this.gsbLoginService.getIsLogin();
  }

  logout(){
    this.gsbLoginService.logout();
  }
}