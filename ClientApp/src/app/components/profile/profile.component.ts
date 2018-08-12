import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  
  private sub: any;
  private user: any;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] != '') {
        this.userService.get(params['id']).subscribe(result => {
          this.user = result;
        });
      } else {
        this.userService.get(this.authService.Id).subscribe(result => {
          this.user = result;
        });;
      }
    });
    console.log(this.user);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
