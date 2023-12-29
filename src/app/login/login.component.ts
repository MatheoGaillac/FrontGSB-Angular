import { MenuComponent } from '../menu/menu.component';
import { GsbLoginService } from '../service/gsb-login.service';
import { CommonModule } from "@angular/common";
import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: FormControl = new FormControl('');
  password: FormControl = new FormControl('');

  constructor(private loginService: GsbLoginService) {}

  onSubmit() {
    this.loginService.serviceEnvoieLogin(
      this.email.value,
      this.password.value
    );
  }
}
