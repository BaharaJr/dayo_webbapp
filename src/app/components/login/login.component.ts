import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  screen = 'login';
  constructor(
    private title: Title,
    private readonly router: Router,
    private service: FirebaseService
  ) {
    this.title.setTitle('Login');
  }
  ngOnInit() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.rerouteToLogin();
    } else {
      this.checkForTokenValidity();
    }
  }

  rerouteToLogin = () => {
    this.router.navigate(['login']);
  };

  checkForTokenValidity = () => {
    this.service.me().subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['dashboard']);
      },
      (error) => {
        this.rerouteToLogin();
      }
    );
  };
}
