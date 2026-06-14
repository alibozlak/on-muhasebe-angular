import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { jwtTokenKeyNameInLocalStorage } from "../project-constants";

export const authGuard : CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const token = localStorage.getItem(jwtTokenKeyNameInLocalStorage);
  
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

}