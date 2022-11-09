import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login, Register } from '../interfaces/auth.interface';
import {
  CalculationInterface,
  CalculationReqInterface,
  CalculatorSuccessResponse,
} from '../interfaces/calculation.interface';
import { Pager } from '../interfaces/pager.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedIn = false;
  api = '../../api';

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  /**
   * A method to handle login with firebase
   *
   * @param data
   */

  login = (data: Login) => {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  };

  /**
   * A method to handle registration with firebase
   *
   * @param data
   */

  register = (data: Register) => {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  };

  /**
   * A method to handle logout with firebase
   *
   */

  logout = () => {
    this.auth.signOut().then(
      () => {
        this.snackBar.open('Successfully logged out...', '', {
          duration: 5000,
          panelClass: 'success',
        });
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      },
      (error) => {
        console.log('ERR', error);
        this.snackBar.open(error.message, '', {
          panelClass: 'error',
          duration: 5000,
        });
        this.router.navigate(['register']);
      }
    );
  };

  me = (): Observable<any> => {
    const token = localStorage.getItem('auth_token');
    return this.http.get(`${this.api}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  history = (
    pageDetails: Pager
  ): Observable<{ history: CalculationInterface[]; total: number }> => {
    const token = localStorage.getItem('auth_token');
    return this.http.get<{ history: CalculationInterface[]; total: number }>(
      `${this.api}/calculations?page=${pageDetails.page}&pageSize=${pageDetails.pageSize}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  delete = (id: string): Observable<CalculatorSuccessResponse> => {
    const token = localStorage.getItem('auth_token');
    return this.http.delete<CalculatorSuccessResponse>(
      `${this.api}/calculations/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  calculate = (
    data: CalculationReqInterface
  ): Observable<CalculationInterface> => {
    const token = localStorage.getItem('auth_token');
    return this.http.post<CalculationInterface>(
      `${this.api}/calculations`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };
}
