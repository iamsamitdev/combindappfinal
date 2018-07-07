import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  // กำหนดตัวแปรผูกฟอร์ม (Model)
  userData = {
    "fullname":"",
    "email":"",
    "tel":"",
    "username":"",
    "password":""
  }

  // ตัวแปรรับข้อมูลจาก api
  responseData:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public alertCtrl: AlertController,
    public webapi: WebapiServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }

  gotoDashboard() {
    this.navCtrl.setRoot(TabsPage);
  }

  signup(){
    console.log(this.userData);
  }

}
