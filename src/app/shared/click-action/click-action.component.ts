import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalculationInterface } from '../interfaces/calculation.interface';

@Component({
  selector: 'app-click-action',
  templateUrl: './click-action.component.html',
  styleUrls: ['./click-action.component.css'],
})
export class ClickActionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ClickActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalculationInterface
  ) {}

  ngOnInit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
