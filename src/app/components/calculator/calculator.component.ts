import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CalculationInterface } from '../../shared/interfaces/calculation.interface';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  left: string = '';
  right: string = '';
  operator: string = '+';
  response!: CalculationInterface;
  loading = false;
  reload!: number;
  result!: number;
  operators = ['-', '+', '%', '/', '*'];
  @Input() fromDashboard = false;
  constructor(
    private service: FirebaseService,
    private snackBar: MatSnackBar,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle('Calculator');
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
      (response) => {},
      (error) => {
        this.rerouteToLogin();
      }
    );
  };

  calculate = () => {
    if (this.left !== '' && this.right !== '' && this.validOperator) {
      this.loading = true;
      this.service
        .calculate({
          left: this.left,
          right: this.right,
          operator: this.operator,
        })
        .subscribe(
          (res) => {
            this.response = res;
            this.result = res.result;
            this.loading = false;
            this.reload = new Date().valueOf();
          },
          (error) => {
            this.loading = false;

            if (error.status == 401) {
              this.router.navigate(['/login']);
            } else {
              this.snackBar.open(error.message, '', {
                panelClass: 'error',
                duration: 5000,
              });
            }
          }
        );
    }
  };

  get calculations() {
    return this.calculate();
  }

  get validOperator() {
    return this.operators.includes(this.operator);
  }

  get currentResult() {
    return this.result
  }
}
