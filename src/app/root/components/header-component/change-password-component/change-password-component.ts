import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangePasswordRequestDto } from './change-password-request-dto';
import { ResponseBody } from '../../../utils/response-bodies/response-body.model';
import { baseApiUrl } from '../../../utils/project-constants';

@Component({
  selector: 'app-change-password-component',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  templateUrl: './change-password-component.html',
  styleUrl: './change-password-component.css',
})
export class ChangePasswordComponent {

  private formBuilder : FormBuilder = inject(FormBuilder);
  private httpClient : HttpClient = inject(HttpClient);
  private matSnackBar : MatSnackBar = inject(MatSnackBar);

  public changePasswordForm = this.formBuilder.group({
    currentPassword : [null, [Validators.required,]],
    newPassword : [null, [Validators.required, Validators.minLength(8)]],
    confirmPassword : [null, [Validators.required, Validators.minLength(8)]], 
  },
  {
    validators: this.passwordMatchValidator
  });

  public hideCurrent: boolean = true;
  public hideNew: boolean = true;
  public hideConfirm: boolean = true;

  // public passwordStrengthValue: number = 0;
  // public passwordStrengthColor: 'warn' | 'accent' | 'primary' = 'warn';
  // public passwordStrengthText: string = '';

  // constructor() {
  //   this.changePasswordForm.get('newPassword')?.valueChanges
  //     .pipe(takeUntilDestroyed())
  //     .subscribe(value => {
  //       this.calculatePasswordStrength(value || '');
  //     });
  // }

  private passwordMatchValidator(control: any) {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  // private calculatePasswordStrength(password: string): void {
  //   if (!password) {
  //     this.passwordStrengthValue = 0;
  //     this.passwordStrengthColor = 'warn';
  //     this.passwordStrengthText = '';
  //     return;
  //   }

  //   let score = 0;

  //   if (password.length >= 8) score++;                     
  //   if (/[a-z]/.test(password)) score++;                    
  //   if (/[A-Z]/.test(password)) score++;                    
  //   if (/[0-9]/.test(password)) score++;                    
  //   if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;   

   
  //   if (score <= 2) {
  //     this.passwordStrengthValue = 33;
  //     this.passwordStrengthColor = 'warn'; 
  //     this.passwordStrengthText = 'Zayıf';
  //   } else if (score <= 4) {
  //     this.passwordStrengthValue = 66;
  //     this.passwordStrengthColor = 'accent'; 
  //     this.passwordStrengthText = 'Orta';
  //   } else {
  //     this.passwordStrengthValue = 100;
  //     this.passwordStrengthColor = 'primary'; 
  //     this.passwordStrengthText = 'Güçlü';
  //   }
  // }

  public updatePassword() {
    const changePasswordRequestDto : ChangePasswordRequestDto = {
      currentPassword : this.changePasswordForm.getRawValue().currentPassword!,
      newPassword : this.changePasswordForm.getRawValue().confirmPassword!
    };

    this.httpClient.put<ResponseBody>(baseApiUrl + "/v1/users/change-password", changePasswordRequestDto).subscribe({
      next : (response) => {
        if (response.success){
          this.changePasswordForm.reset();
          this.matSnackBar.open("Şifreniz değiştirildi..","Kapat", {duration : 2000});
        } else {
          this.matSnackBar.open("Şifre değiştirme işlemi başarısız..","Kapat", {duration : 5000});
          console.error(response);
        }
      },

      error : (e) => {
        this.matSnackBar.open("Şifre değiştirme işlemi başarısız..","Kapat", {duration : 5000});
        console.error(e);
      }
    });
  }
}
