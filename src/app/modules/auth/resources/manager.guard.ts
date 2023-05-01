import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from './auth';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate {
  constructor(private router: Router) {}
  user: User = JSON.parse(localStorage.getItem('user') || '');
  canActivate(): boolean {
    if (!this.user.isManager) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
