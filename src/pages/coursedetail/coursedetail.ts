import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the CoursedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coursedetail',
  templateUrl: 'coursedetail.html',
})
export class CoursedetailPage {

  getcid: number; // รับค่าตัวแปร cid
  cdetail: any; // เก็บข้อมูลที่ได้จาก json
  imgPath:any; // ตำแหน่งเก็บรูป

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public webapi: WebapiServiceProvider,
    public global:GlobalProvider) {
      this.imgPath = global.baseURLAPI;
      this.getcid = navParams.get('cid');
  }

  ionViewDidLoad() {
    this.webapi.getData("feed_course_detail.php?cid=" + this.getcid).then((result) => {
      console.log(result);
      this.cdetail = result;
    }, (error) => {

      console.log(error);

    });
  }

}
