import { Component, Input, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit() {}

  login = () => {
    console.log('HERE');
    this.loading = true;
  };
}
