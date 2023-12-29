import { Component, Renderer2 } from '@angular/core';
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
  constructor(private gsbLoginService: GsbLoginService, private renderer: Renderer2) {
  }

  isLoggedIn(): boolean {
    return this.gsbLoginService.getIsLogin();
  }

  logout(){
    this.gsbLoginService.logout();
  }

  closeDropdown() {
    const navbar = document.getElementById('navbarNavDropdown');
    this.renderer.removeClass(navbar, 'show');
  }
}
