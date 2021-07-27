import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authenticationFailed: boolean;

  credentials: {
    login: string;
    password: string;
  };

  constructor(private router: Router, private userService: UserService) {
    this.credentials = { login: '', password: '' };
    this.authenticationFailed = false;
  }

  ngOnInit(): void {
    console.log('Login init');
  }

  authenticate(): void {
    this.authenticationFailed = false;
    this.userService.authenticate(this.credentials).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => (this.authenticationFailed = true)
    });
  }
}
