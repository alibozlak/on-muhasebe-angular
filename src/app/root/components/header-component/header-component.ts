import { Component, inject, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { isUserAdmin } from '../../utils/project-constants';


@Component({
  selector: 'app-header-component',
  imports: [MatToolbarModule, MatMenuTrigger, MatIconModule, MatMenuModule, MatDividerModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent implements OnInit {

  private router : Router = inject(Router); 
  
  public isUserAdmin : boolean = false;

  ngOnInit(): void {
    this.isUserAdmin = isUserAdmin();
  }

  public logout(){
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  public goChangePasswordPage(){
    this.router.navigate(['/change-password']);
  }

  public goAddAccountPage(){
    this.router.navigate(['/add-account']);
  }
}
