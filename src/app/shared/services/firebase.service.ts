import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login, Register } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedIn = false;

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly router: Router,
    private snackBar: MatSnackBar
  ) {}

  /**
   * A method to handle login with firebase
   *
   * @param data
   */

  login = (data: Login) => {
    this.auth.signInWithEmailAndPassword(data.email, data.password).then(
      () => {
        this.snackBar.open('Successfully logged In...', '', {
          duration: 5000,
          panelClass: 'success',
        });
        localStorage.setItem('auth_token', '');
        this.router.navigate(['dashboard']);
      },
      (error) => {
        console.log('ERR', error);
        this.snackBar.open(error.message, '', {
          panelClass: 'error',
          duration: 5000,
        });
        this.router.navigate(['login']);
      }
    );
  };
}
