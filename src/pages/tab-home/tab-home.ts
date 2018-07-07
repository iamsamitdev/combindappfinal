import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , App } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-tab-home',
  templateUrl: 'tab-home.html',
})
export class TabHomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabHomePage');
  }

  register()
  {
    this.app.getRootNav().push(RegisterPage);
  }

  login()
  {
    this.app.getRootNav().push(LoginPage);
  }

}
