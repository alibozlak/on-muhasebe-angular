import { Component, OnInit } from '@angular/core';
import { AdminHomeComponent } from "../for-admin/admin-home-component/admin-home-component";
import { UserHomeComponent } from "../for-user/user-home-component/user-home-component";
import { HeaderComponent } from "../header-component/header-component";
import { isUserAdmin } from '../../utils/project-constants';

@Component({
  selector: 'app-home-component',
  imports: [AdminHomeComponent, UserHomeComponent, HeaderComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {

  public isUserAdmin : boolean |undefined;

  ngOnInit(): void {
    this.isUserAdmin = isUserAdmin();
  }

}
