import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateAccountRequestDto } from './create-account-request-dto';
import { baseApiUrl } from '../../../utils/project-constants';

@Component({
  selector: 'app-add-account-component',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSlideToggleModule,
  ],
  templateUrl: './add-account-component.html',
  styleUrl: './add-account-component.css',
})
export class AddAccountComponent {

  private formBuilder : FormBuilder = inject(FormBuilder);
  private httpClient : HttpClient = inject(HttpClient);
  private matSnackBar : MatSnackBar = inject(MatSnackBar);

  public addAccountForm = this.formBuilder.group({
    accountName : [null, [Validators.required, Validators.minLength(3)]],
    isCashAccount : [false, [Validators.required,]],
    amount : [null, [Validators.required,]],
  });

  public createAccount(formDirective : FormGroupDirective) {
    const createAccountRequestDto : CreateAccountRequestDto = {
      accountName: this.addAccountForm.get('accountName')!.value!,
      isCashAccount: this.addAccountForm.get('isCashAccount')!.value!,
      amount: this.addAccountForm.get('amount')!.value!,
    };

    this.addAccountUtilFunc(formDirective, createAccountRequestDto);
  }

  private addAccountUtilFunc(formDirective : FormGroupDirective, createAccountRequestDto : CreateAccountRequestDto) {
    this.httpClient.post(baseApiUrl + "/v1/accounts/create-account", createAccountRequestDto).subscribe({
      next : (response) => {
        this.matSnackBar.open("Hesap başarıyla oluşturuldu.", "Kapat", {
          duration: 3000,
        });
        formDirective.resetForm();
        this.addAccountForm.reset();
      },
      error : (error) => {
        console.error("Hesap oluşturulurken bir hata oluştu:", error);
        this.matSnackBar.open("Hesap oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.", "Kapat", {
          duration: 3000,
        });
      }
    });
  }
}
