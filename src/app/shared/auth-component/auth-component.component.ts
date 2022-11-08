import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private service: FirebaseService) {}

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
    this.service.login({ email: this.email, password: this.password });
  };

  register = () => {
    this.service.register({ email: this.email, password: this.password });
  };
}
