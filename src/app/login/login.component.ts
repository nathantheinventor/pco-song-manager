import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NavController } from '../../../node_modules/@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;

  constructor(private navCtrl: NavController, private api: ApiService) { }

  ngOnInit() {
    if (localStorage.username && localStorage.password) {
      this.navCtrl.navigateRoot(`/main`);
    }
  }

  async login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter your username and password';
      return;
    }

    if (!(await this.api.check_login(this.username, this.password))) {
      this.errorMessage = 'Incorrect username or password';
      return;
    }

    localStorage.username = this.username;
    localStorage.password = this.password;
    this.navCtrl.navigateRoot(`/main`);
  }
}
