import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  screen = 'login';
  constructor(private title: Title) {
    this.title.setTitle('Login');
  }
  ngOnInit() {}
}
