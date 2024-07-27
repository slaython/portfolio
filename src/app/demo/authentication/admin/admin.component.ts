import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LoadingComponent } from '../../loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, LoadingComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export default class AdminComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService) {}
  // REQUISIÇÃO DE LOGIN
  login() {
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe(response => {
      console.log('Login successful', response);
      this.loading = false;
    }, error => {
      console.error('Login failed', error);
      this.loading = false;
    });
  }

  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];
}
