import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabHomePage } from '../pages/tab-home/tab-home';
import { TabCoursePage } from '../pages/tab-course/tab-course';
import { TabServicePage } from '../pages/tab-service/tab-service';
import { TabArticlePage } from '../pages/tab-article/tab-article';
import { TabContactPage } from '../pages/tab-contact/tab-contact';
import { SidePaymentPage } from '../pages/side-payment/side-payment';
import { SidePortfolioPage } from '../pages/side-portfolio/side-portfolio';
import { SideSchedulePage } from '../pages/side-schedule/side-schedule';
import { SideSettingPage } from '../pages/side-setting/side-setting';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { WebapiServiceProvider } from '../providers/webapi-service/webapi-service';
import { HttpModule } from '@angular/http';
import { GlobalProvider } from '../providers/global/global';
import { CoursedetailPage } from '../pages/coursedetail/coursedetail';
import { TabChatPage } from '../pages/tab-chat/tab-chat';
import { ShowpushdetailPage } from '../pages/showpushdetail/showpushdetail';

/*** FIREBASE MODULE ***/
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { NativeAudio } from '@ionic-native/native-audio';

var config = {
  apiKey: "AIzaSyAgaTj-Bag_VBKtAyi6upgByunP4nt1Cbk",
  authDomain: "combindchatapp-samit.firebaseapp.com",
  databaseURL: "https://combindchatapp-samit.firebaseio.com",
  projectId: "combindchatapp-samit",
  storageBucket: "combindchatapp-samit.appspot.com",
  messagingSenderId: "625436089621"
};

/**** PUSH NOTIFICATION ***/
import { FCM } from '@ionic-native/fcm'; 

@NgModule({
  declarations: [
    MyApp,
    TabHomePage,
    TabCoursePage,
    TabServicePage,
    TabArticlePage,
    TabContactPage,
    TabsPage,
    SidePaymentPage,
    SidePortfolioPage,
    SideSchedulePage,
    SideSettingPage,
    RegisterPage,
    LoginPage,
    CoursedetailPage,
    TabChatPage,
    ShowpushdetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabHomePage,
    TabCoursePage,
    TabServicePage,
    TabArticlePage,
    TabContactPage,
    TabsPage,
    SidePaymentPage,
    SidePortfolioPage,
    SideSchedulePage,
    SideSettingPage,
    RegisterPage,
    LoginPage,
    CoursedetailPage,
    TabChatPage,
    ShowpushdetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WebapiServiceProvider,
    GlobalProvider,
    NativeAudio,
    FCM
  ]
})
export class AppModule {}
