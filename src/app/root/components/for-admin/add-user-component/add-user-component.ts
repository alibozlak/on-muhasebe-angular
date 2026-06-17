import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AddUserService } from './add-user-service';
import { CreateUserRequestDto } from './dtos/create-user-request-dto';

@Component({
  selector: 'app-add-user-component',
  imports: [MatButtonModule, MatIconModule, ReactiveFormsModule, MatSnackBarModule,
    MatSlideToggleModule, 
  ],
  templateUrl: './add-user-component.html',
  styleUrl: './add-user-component.css',
})
export class AddUserComponent {

  private userService : AddUserService = inject(AddUserService);
  private formBuilder : FormBuilder = inject(FormBuilder);
  private matSnackBar : MatSnackBar = inject(MatSnackBar);

  public createUserform = this.formBuilder.group({
    username : [null, Validators.required],
    password : [null, Validators.required],
    email : [null, [Validators.required, Validators.email]],
    isActive : [true, ],
    isAdmin : [false, ],
    extraInformation : [null,null],
  });

  public create(){
    const createUserRequestDto : CreateUserRequestDto = {
      username : this.getRawValue().username!,
      password : this.getRawValue().password!,
      email : this.getRawValue().email!,
      isActive : this.getRawValue().isActive!,
      isAdmin : this.getRawValue().isAdmin!,
      extraInformation : this.getRawValue().extraInformation,
    }

    this.userService.addUser(createUserRequestDto).subscribe({
      next : (response) => {
        if(response.success){
          this.createUserform.reset({
            isActive: true,
            isAdmin: false
          });
          this.matSnackBar.open("Kullanıcı kaydı yapıldı..","Kapat", {duration : 2000});
        } else {
          this.matSnackBar.open("Admin değilsiniz, kullanıcı kaydı yapamazsınız!","Kapat", {duration : 5000});
        }
      },

      error : (e) => {
        this.matSnackBar.open("Kullanıcı kaydı yapılamadı","Kapat", {duration : 2000});
        console.error(e);
      }
    });
  }

  private getRawValue() {
    return this.createUserform.getRawValue();
  }
}
