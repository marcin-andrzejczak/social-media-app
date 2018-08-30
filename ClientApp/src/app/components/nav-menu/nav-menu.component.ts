import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy{

  private loggedSub: Subscription;
  public logged: boolean;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.loggedSub = this.authService.isLogged().subscribe(state => { this.logged = state });
  }

  ngOnDestroy() {
    this.loggedSub.unsubscribe();
  }

  public logout() {
    this.authService.logout();
  }

  public isLogged(): boolean {
    return this.logged;
  }

  public getFullName(): string{
    return this.authService.getCurrentUserFullName();
  }

  public getProfilePictureUrl(): string {
    return this.authService.getCurrentUserProfilePictureUrl();
  }

}
