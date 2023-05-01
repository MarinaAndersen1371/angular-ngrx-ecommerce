import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  user = localStorage.getItem('user');
  canActivate(): boolean {
    if (!this.user) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
