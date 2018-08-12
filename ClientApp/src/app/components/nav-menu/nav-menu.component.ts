import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  profilePicUrl: string;
  firstName: string;
  lastName: string;

  constructor(private router: Router, private authService: AuthService) {
    this.profilePicUrl = authService.ProfilePicture;
    this.firstName = authService.FirstName;
  }

  ngOnInit() {
    if (this.authService.isLogged()) { 
      this.authService.getUserInfo();
      this.profilePicUrl = this.authService.ProfilePicture;
      this.firstName = this.authService.FirstName;
      this.lastName = this.authService.LastName;
    }
  }

  public logout() {
    this.authService.logout();
  }

  public isLogged(): boolean {
    if (this.authService.isLogged()) {
      this.profilePicUrl = this.authService.ProfilePicture;
      this.firstName = this.authService.FirstName;
      this.lastName = this.authService.LastName;
      return true;
    }
    return false;
  }

}
