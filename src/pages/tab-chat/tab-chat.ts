import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-tab-chat',
  templateUrl: 'tab-chat.html',
})
export class TabChatPage {

  fullname: string = '';
  message: string = '';
  _chatSubscription;
  messages: object[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    private nativeAudio: NativeAudio ) {

    this.nativeAudio.preloadSimple('uniqueId1', 'assets/audio/get_outto.mp3').then(null);

    // อ่านค่าจาก Local Storage
    const data = JSON.parse(localStorage.getItem('userData'));

    if(data == null){
      this.fullname = 'guest';
    }else{
      this.fullname = data.userData.fullname;
    }

    // Read from firebase
    this._chatSubscription = this.db.list('/chat').valueChanges().subscribe( (res) => { 
      //console.log("data", res)
      this.messages = res;
    },(err)=>{
       console.log(err)
    });

  }

  ionViewDidLoad() {
    this.db.list('/chat').push({
      specialMessage: true,
      message: `${this.fullname} เข้าร่วมห้องสนทนา`
    });
  }

  sendMessage() {

    this.nativeAudio.play('uniqueId1').then(null);

    this.db.list('/chat').push({
      username: this.fullname,
      message: this.message
    }).then(() => {
      // message is sent
    }, (err) => {
      console.log(err);
    });
    this.message = '';

  }

  ionViewWillLeave(){
    this._chatSubscription.unsubscribe();
    this.db.list('/chat').push({
      specialMessage: true,
      message: `${this.fullname} ออกจากห้องสนทนา`
    });
  }

}
