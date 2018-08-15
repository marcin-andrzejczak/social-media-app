import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  User: User;
  isLogged: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.User = authService.User;
  }

  ngOnInit() {
    this.isLogged = this.authService.isLogged();
    if (this.isLogged) {
      this.User = this.authService.User;
    }
  }

  public logout() {
    this.authService.logout();
  }

}
