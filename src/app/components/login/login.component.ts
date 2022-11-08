import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loading = false;
  constructor() {}

  ngOnInit() {}

  login = () => {
    console.log('HERE');
    this.loading = true;
  };
}
