import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

   // กำหนดตัวแปรผูกฟอร์ม (Model)
   userData = {
    "username":"",
    "password":""
  }

  // ตัวแปรรับข้อมูลจาก api
  responseData:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public app:App,
    public alertCtrl: AlertController,
    public webapi: WebapiServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  register(){
    this.navCtrl.setRoot(RegisterPage);
  }

  gotoDashboard()
  {
    this.navCtrl.setRoot(TabsPage);
  }

  login()
  {
    //console.log(this.userData);
    this.webapi.postData(this.userData,'login.php').then((result)=>{
      this.responseData = result;
      //console.log(this.responseData);
      if(this.responseData.userData){
        let alert = this.alertCtrl.create({
          title:"สถานะการเข้าระบบ",
          subTitle:"เข้าระบบเรียบร้อยแล้ว",
          buttons:['Dismiss']
        });
        alert.present();

        // บันทึกข้อมูลลง local storage
        localStorage.setItem('userData',JSON.stringify(this.responseData));

        // ส่งกลับไปหน้าหลัก (dashboard)
        this.navCtrl.setRoot(TabsPage);
      }else{
        let alert = this.alertCtrl.create({
          title:"มีข้อผิดพลาด",
          subTitle:"เข้าระบบไม่ถูกต้อง ลองใหม่",
          buttons:['Dismiss']
        });
        alert.present();
      }
    },(err)=>{
      console.log(err);
    });
  }

}
