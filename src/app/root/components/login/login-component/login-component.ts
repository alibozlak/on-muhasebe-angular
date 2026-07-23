import { Component, inject } from '@angular/core';
import { LoginService } from '../login-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequestDto } from '../dtos/login-request-dto';
import { jwtTokenKeyNameInLocalStorage } from '../../../utils/project-constants';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  private loginService : LoginService = inject(LoginService);
  private formBuilder : FormBuilder = inject(FormBuilder);
  private router : Router = inject(Router);

  loginForm = this.formBuilder.group({
    username : ['', [Validators.required, Validators.minLength(1)]],
    password: ['', [Validators.required, Validators.minLength(6),]]
  });

  public login(){
    if (this.loginForm.valid){
      let loginRequestDto : LoginRequestDto = {
        username : this.loginForm.getRawValue().username!,
        password : this.loginForm.getRawValue().password!
      }

      this.loginService.login(loginRequestDto).subscribe({
        next : (response) => {
          localStorage.setItem(jwtTokenKeyNameInLocalStorage, response.object.jwtToken.toString());
          this.router.navigate(['/'], { replaceUrl : true });
        },

        error : (e) => {
          localStorage.clear();
          console.log(e);          
        }
      });
    }
  }

}
