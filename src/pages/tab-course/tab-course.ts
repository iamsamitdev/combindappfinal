import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { WebapiServiceProvider } from '../../providers/webapi-service/webapi-service';
import { GlobalProvider } from '../../providers/global/global';
import { CoursedetailPage } from '../coursedetail/coursedetail';

@IonicPage()
@Component({
  selector: 'page-tab-course',
  templateUrl: 'tab-course.html',
})
export class TabCoursePage {

  responseData: any;
  imgPath:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public webapi: WebapiServiceProvider,
    public global:GlobalProvider,
    public app: App) {
      this.imgPath = global.baseURLAPI;
  }

  ionViewDidLoad() {
    this.webapi.getData("feed_course.php").then((result) => {
      //console.log(result);
      this.responseData = result;
    }, (error) => {
      console.log(error);
    });
  }


  doRefresh(refresher) {

    console.log('Begin async operation', refresher);

    setTimeout(() => {
        this.webapi.getData("feed_course.php").then((result) => {
          console.log(result);
          this.responseData = result;
        }, (error) => {
          console.log(error);
        });

      refresher.complete();
    }, 2000);
  }

   // เขียนฟังก์ชันรับ event courseDetail
   courseDetail(cid) {
    this.app.getRootNav().push(CoursedetailPage, {
      cid: cid
    });
  }

}
