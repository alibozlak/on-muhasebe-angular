import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-component',
  imports: [MatToolbarModule, MatMenuTrigger, MatIconModule, MatMenuModule, MatDividerModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {

  private router : Router = inject(Router); 

  public logout(){
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  public goChangePasswordPage(){
    this.router.navigate(['/change-password']);
  }
}
