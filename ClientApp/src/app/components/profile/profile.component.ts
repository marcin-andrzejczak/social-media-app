import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  
  private sub: any;
  private UserObservable: Observable<User>;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.UserObservable = this.userService.get(params['id']);
        console.log("Profile obtained with parameter id=" + params['id']);
      } else {
        this.UserObservable = this.userService.get(this.authService.User.Id);
        console.log("Profile obtained for current user with id=" + this.authService.User.Id);
        debugger;
      }
    });
    console.log(this.UserObservable);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
