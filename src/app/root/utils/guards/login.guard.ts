import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { jwtTokenKeyNameInLocalStorage } from "../project-constants";

export const loginGuard : CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const token = localStorage.getItem(jwtTokenKeyNameInLocalStorage);
  
  if (token) {
    router.navigate(['/']);
    return false;
  } else {
    return true;
  }

}