import { MenuComponent } from '../menu/menu.component';
import { GsbLoginService } from '../service/gsb-login.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MenuComponent, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user_id: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', Validators.required);
  formSubmitted: boolean = false;
  showPassword: boolean = false;

  constructor(private loginService: GsbLoginService) {}

  onSubmit() {
    this.formSubmitted = true;

    if (this.user_id.invalid || this.password.invalid) {
      return;
    }
    this.loginService.serviceEnvoieLogin(
      this.user_id.value,
      this.password.value
    );
  }

  getErrorMessage() {
    return this.loginService.getErrorStatus();
  }

  toggleVisibility(){
    this.showPassword = !this.showPassword;
  }
}
