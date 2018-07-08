import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-showpushdetail',
  templateUrl: 'showpushdetail.html',
})
export class ShowpushdetailPage {

  getSID:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getSID = navParams.get('sid');
  }

  ionViewDidLoad() {
    
  }

}
