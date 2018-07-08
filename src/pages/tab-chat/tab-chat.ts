import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-tab-chat',
  templateUrl: 'tab-chat.html',
})
export class TabChatPage {

  // กำหนดตัวแปรเก็บชื่อและข้อความ
  fullname:string = '';
  message:string = '';
  _chatSubscription;
  messages:object[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase) {

      const data = JSON.parse(localStorage.getItem('userData'));
      if(data == null){
        this.fullname = 'Guest';
      }else{
        this.fullname = data.userData.fullname;
      }

      // Read from firebase
      this._chatSubscription = this.db.list('/chat').valueChanges().subscribe( (res) => { 
        //console.log(res)
        this.messages = res;
      },(err)=>{
         console.log(err)
      });

  }

  ionViewDidLoad() {
    
  }

  sendMessage()
  {
    this.db.list('/chat').push({
      username: this.fullname,
      message: this.message
    }).then(()=>{
      // message send

    },(err)=>{
      // error message
      console.log(err);
    });

    // Clear chat input
    this.message = '';
  }

}
