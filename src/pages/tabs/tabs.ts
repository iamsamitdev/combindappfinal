import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabHomePage } from '../tab-home/tab-home';
import { TabCoursePage } from '../tab-course/tab-course';
import { TabServicePage } from '../tab-service/tab-service';
import { TabArticlePage } from '../tab-article/tab-article';
import { TabContactPage } from '../tab-contact/tab-contact';
import { TabChatPage } from '../tab-chat/tab-chat';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  // กำหนดตัวแปรสำหรับเก็บชื่อ tab ต่าง ๆ ไว้
  tab1Root:any = TabHomePage;
  tab2Root:any = TabCoursePage;
  tab3Root:any = TabServicePage;
  tab4Root:any = TabArticlePage;
  tab5Root:any = TabContactPage;
  tab6Root:any = TabChatPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
