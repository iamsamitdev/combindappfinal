import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { NativeAudio } from '@ionic-native/native-audio';

@IonicPage()
@Component({
  selector: 'page-tab-chat',
  templateUrl: 'tab-chat.html',
})
export class TabChatPage {

  // กำหนดตัวแปรเก็บชื่อและข้อความ
  fullname: string = '';
  message: string = '';
  _chatSubscription;
  messages: object[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    private nativeAudio: NativeAudio,
    public platform: Platform) {

    const data = JSON.parse(localStorage.getItem('userData'));
    if (data == null) {
      this.fullname = 'Guest';
    } else {
      this.fullname = data.userData.fullname;
    }

    if (!this.platform.is('core')) {
      this.nativeAudio.preloadSimple('uniqueId1', 'assets/audio/get_outto.mp3').then(null);
    }

    // Read from firebase
    this._chatSubscription = this.db.list('/chat').valueChanges().subscribe((res) => {
      //console.log(res)
      this.messages = res;
    }, (err) => {
      console.log(err)
    });

  }

  ionViewDidLoad() {

  }

  sendMessage() {
    // ตรวจค่าว่าง
    if (this.message != '') {
      this.db.list('/chat').push({
        username: this.fullname,
        message: this.message
      }).then(() => {
        // message send
        // Play sound when read new message
        if (!this.platform.is('core')) {
          this.nativeAudio.play('uniqueId1').then(null);
        }
      }, (err) => {
        // error message
        console.log(err);
      });

      // Clear chat input
      this.message = '';
    }
  }
}
