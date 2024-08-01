import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LoadingComponent } from '../../loading/loading.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {}
  // REQUISIÇÃO DE LOGIN
  login() {
    this.loading = true;
    if(this.email == '' || this.password == '') {
      this.toastr.warning('Preencha todos os campos.');
      this.loading = false;
      return;
    }if(this.password.length < 6) {
      this.toastr.warning('Sua senha deve conter no minimo 6 caracteres.');
      this.loading = false;
      return;
    }
    this.authService.login(this.email, this.password).subscribe(response => {
      if(response.status == 200) {
        this.toastr.success(response.message);
      }if(response.status == 401) {
        this.toastr.warning(response.message);
      }
      // MONTA O RESPONSE PARA O LOCAL STORAGE
      const user = {
        id: response.usuarios.id,
        nome: response.usuarios.nome,
        senha: response.usuarios.senha,
        token: response.token
      };
      console.log(response);
      this.authService.setUser(user);
      this.router.navigate(['/dashboard/default']);
      this.loading = false;
    }, error => {
      this.toastr.error('Algo deu errado, reinicie a pagina e tente novamente.');
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
