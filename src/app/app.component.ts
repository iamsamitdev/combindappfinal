import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SideSchedulePage } from '../pages/side-schedule/side-schedule';
import { SidePortfolioPage } from '../pages/side-portfolio/side-portfolio';
import { SidePaymentPage } from '../pages/side-payment/side-payment';
import { SideSettingPage } from '../pages/side-setting/side-setting';

/**  Push Notification */
import { FCM } from '@ionic-native/fcm';
import { ShowpushdetailPage } from '../pages/showpushdetail/showpushdetail';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private fcm: FCM,
    public alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'ตารางอบรม', component: SideSchedulePage, icon: "calendar" },
      { title: 'ผลงานของเรา', component: SidePortfolioPage, icon: "albums" },
      { title: 'ช่องทางชำระเงิน', component: SidePaymentPage, icon: "logo-bitcoin" },
      { title: 'ตั้งค่าระบบ', component: SideSettingPage, icon: "settings" },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // ลงทะเบียนเครื่องเพื่อส่ง push notification
      // เช็คว่าเป็น device จริงเท่านั้น     
      if (!this.platform.is('core')) {
        /*
       *---------------------------------------------------------------
       *  PUSH NOTIFICATION WITH FIREBASE
       *---------------------------------------------------------------
       */
        // ลงทะเบียน  device เพื่อรับ Token
        this.fcm.subscribeToTopic('all');
        this.fcm.getToken().then(token => {
          //alert(token);
          localStorage.setItem('token_key', token);
        });

        /*
        * ส่วนนี้จะเป็นส่วนของการับการ push
        */
        this.fcm.onNotification().subscribe(data => {
          // Background mode
          if (data.wasTapped) {
            this.nav.push(ShowpushdetailPage, { sid: data.pid })
          } else {
            // Fourground mode
            let alertdig = this.alertCtrl.create({
              title:data.title, 
              subTitle:data.body, 
              message:'pid='+data.pid+'groub='+data.groub,
              buttons:[ {
                text: 'ดูรายละเอียด',
                handler: () => { 
                  this.nav.push(ShowpushdetailPage,{sid:data.pid})
                }
              }]
            });
            alertdig.present();
          }
        });

      }

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
