import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClickActionComponent } from '../../shared/click-action/click-action.component';
import { CalculationInterface } from '../../shared/interfaces/calculation.interface';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnChanges {
  history: CalculationInterface[] = [];
  loading: boolean = true;
  error: string = '';
  email: string = '';
  currentPage: number = 0;
  pageSize: number = 10;
  pageSizeOptions: any[] = [5, 10, 50, 100];
  totalRows!: number;
  @Input() fromCalculator = false;
  @Input() reload!: number;
  constructor(
    private service: FirebaseService,
    private readonly router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.history = [...this.history];
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.rerouteToLogin();
    } else {
      this.checkForTokenValidity();
    }
  }

  ngOnChanges() {
    this.getHistory();
  }

  rerouteToLogin = () => {
    this.router.navigate(['login']);
  };

  checkForTokenValidity = () => {
    this.service.me().subscribe(
      (response) => {
        this.email = response.email;
        this.getHistory();
      },
      (error) => {
        this.rerouteToLogin();
      }
    );
  };

  getHistory = () => {
    this.service
      .history({ page: this.currentPage, pageSize: this.pageSize })
      .subscribe(
        (res) => {
          this.history = res.history;
          this.totalRows = res.total;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.loading = error.message;
        }
      );
  };
  cardClicked = (data: any) => {
    this.openDialog(data);
  };

  openDialog(data: CalculationInterface): void {
    const dialogRef = this.dialog.open(ClickActionComponent, {
      data,
      width: 'auto',
      maxHeight: '30vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(data.id);
      }
    });
  }

  delete = (id: string) => {
    this.service.delete(id).subscribe(
      (res) => {
        this.snackBar.open(res.message, '', {
          panelClass: 'success',
          duration: 5000,
        });
        this.getHistory();
      },
      (error) => {
        this.snackBar.open(error.message, '', {
          panelClass: 'error',
          duration: 5000,
        });
      }
    );
  };

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loading = true;
    this.getHistory();
  }
}
