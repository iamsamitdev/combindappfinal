import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { GlobalProvider } from '../global/global';

@Injectable()
export class WebapiServiceProvider {

  // Base URI API
  baseUrl:any;

  constructor(
    public http: Http, 
    public toast:ToastController,
    public global:GlobalProvider) {
    this.baseUrl = this.global.baseURLAPI;
  }

  // Post Method
  postData(objdata, segment){
    return new Promise((resolve, reject) => {

      // Header
      let headers = new Headers();
      headers.append('Authorization',this.global.authKey);
      headers.append('Content-Type','application/json');

      this.http.post(this.baseUrl+segment,JSON.stringify(objdata),{headers:headers})
      .subscribe(res=>{
        resolve(res.json());
      },(err)=>{
        if(err.status==0){
            this.toast.create({
              message: 'มีข้อผิดพลาดติดต่อ API ไม่ได้',
              duration: 3000
            }).present();
        }
        reject(err);
      });
    });
  }


  // GET Method
  getData(segment){
    return new Promise((resolve, reject) => {

      // Header
      let headers = new Headers();
      headers.append('Authorization',this.global.authKey);
      headers.append('Content-Type','application/json');

      this.http.get(this.baseUrl+segment,{headers:headers})
      .subscribe(res=>{
        resolve(res.json());
      },(err)=>{
        if(err.status==0){
            this.toast.create({
              message: 'มีข้อผิดพลาดติดต่อ API ไม่ได้',
              duration: 3000
            }).present();
        }
        reject(err);
      });
    });
  }

}
