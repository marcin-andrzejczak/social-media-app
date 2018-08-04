import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterForm } from '../../DTOs/register-form';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: RegisterForm;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.registerForm = new RegisterForm;
  }

  public register(registerForm: RegisterForm) {
    console.log(registerForm.firstname + " " + registerForm.lastname );
    this.userService.create(registerForm).subscribe(result => {
      if (result != null) {
        this.router.navigate(['/']);
      }
    }, error => console.error(error));
  }

}
