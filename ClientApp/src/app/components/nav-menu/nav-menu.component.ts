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
  
  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }

  public logout() {
    this.authService.logout();
  }

  public isLogged(): boolean {
    return this.authService.isLogged();
  }

  public getFullName(): string{
    return this.authService.getCurrentUserFullName();
  }

  public getProfilePictureUrl(): string {
    return this.authService.getCurrentUserProfilePictureUrl();
  }

}
