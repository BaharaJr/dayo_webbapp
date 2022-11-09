import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css'],
})
export class AuthComponentComponent implements OnInit {
  @Input()
  screen!: string;
  hide = true;
  loading = false;
  password: string = '';
  email: string = '';
  constructor(
    private service: FirebaseService,
    private snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  submit = () => {
    this.loading = true;
    if (this.screen === 'login') {
      this.login();
    } else {
      this.register();
    }
  };

  login = () => {
    this.service.login({ email: this.email, password: this.password }).then(
      (response) => {
        console.log(response);
        this.snackBar.open('Successfully logged In...', '', {
          duration: 5000,
          panelClass: 'success',
        });
        this.saveCredentials(response.user);
        this.loading = false;
        this.router.navigate(['dashboard']);
      },
      (error) => {
        this.snackBar.open(error.message, '', {
          panelClass: 'error',
          duration: 5000,
        });
        this.loading = false;
      }
    );
  };

  saveCredentials = (user: any) => {
    localStorage.setItem('auth_token', user._delegate.accessToken);
    localStorage.setItem(
      'auth_refresh',
      user._delegate.stsTokenManager.refreshToken
    );
  };

  register = () => {
    this.service.register({ email: this.email, password: this.password }).then(
      () => {
        this.snackBar.open('Successfully registered...', '', {
          duration: 5000,
          panelClass: 'success',
        });
        this.loading = false;
        this.router.navigate(['login']);
      },
      (error) => {
        this.snackBar.open(error.message, '', {
          panelClass: 'error',
          duration: 5000,
        });
        this.loading = false;
        this.router.navigate(['register']);
      }
    );
  };
}
