import {Component, Renderer2} from '@angular/core';
import {GsbLoginService} from "../service/gsb-login.service";
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private gsbLoginService: GsbLoginService, private renderer: Renderer2) {
  }

  isLoggedIn(): boolean {
    return this.gsbLoginService.getIsLogin();
  }

  isAdmin(): boolean {
    return this.gsbLoginService.visiteurType() === 'A';
  }
}
