import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(private router: Router, private authService: AuthService) { }

  public logout() {
    this.authService.logout();
  }

  public isLogged(): boolean {
    return this.authService.isLogged();
  }

}
