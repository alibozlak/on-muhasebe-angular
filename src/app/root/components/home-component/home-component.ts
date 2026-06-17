import { Component, OnInit } from '@angular/core';
import { AdminHomeComponent } from "../for-admin/admin-home-component/admin-home-component";
import { UserHomeComponent } from "../for-user/user-home-component/user-home-component";
import { getAdminId } from '../../utils/for-jwt/jwt-parser';

@Component({
  selector: 'app-home-component',
  imports: [AdminHomeComponent, UserHomeComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {

  public isUserAdmin : boolean |undefined;

  ngOnInit(): void {
    const adminId : number | null = getAdminId();
    if (adminId && adminId != null && adminId > 0) {
      this.isUserAdmin = true;
    } else {
      this.isUserAdmin = false;
    }
  }

}
