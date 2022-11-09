import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  checkingAuth: boolean = true;
  constructor(
    private readonly router: Router,
    private service: FirebaseService
  ) {}

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
        this.checkingAuth = false;
        this.router.navigate(['dashboard']);
      },
      (error) => {
        this.rerouteToLogin();
      }
    );
  };
}
