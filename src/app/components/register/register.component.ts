import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  loading = false;
  constructor() {}

  ngOnInit() {}

  login = () => {
    console.log('HERE');
    this.loading = true;
  };
}
