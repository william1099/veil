import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { ChatPage } from "../chat/chat";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { UserData } from "../../models/userdata"; 
/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {
	can:boolean = true;
	item: {
		userPic:string;
		userName:string;
		userTimeStart:any;  
		name:string;
		status:string;
		desc:string;
		price:number;
		img:string;
		bid:number;
		duration:any;
		time:any;
		address:string;
		phone:string;
		yourbid:number;
		latestbid:string;
		uid:string;
	} = {
		userPic:"",
		userName:"",
		userTimeStart:"",
		name:"",
		status:"Aktif",
		desc:"Tidak ada deskripsi",
		price:0,
		img:"",
		bid:0,
		duration:0,
		time:0,
		address:"",
		phone:"",
		yourbid:0,
		latestbid:"",
		uid:""
	};
	val:any;
	us:any;
	current:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public app:App, public afAuth:AngularFireAuth,
  	public afDb:AngularFireDatabase, public userdata:UserData, public alCtrl:AlertController) {
  	this.item.userPic = this.navParams.get("userPic");
  	this.item.userName = this.navParams.get("userName");
  	this.item.userTimeStart = this.navParams.get("userTimeStart");
  	this.item.name = this.navParams.get("name");
  	this.item.status = this.navParams.get("status");
  	this.item.desc = this.navParams.get("desc");
  	this.item.price = parseInt(this.navParams.get("price"), 10);
  	this.item.img = this.navParams.get("img");
  	this.item.bid = parseInt(this.navParams.get("bid"), 10);
  	this.item.duration = this.navParams.get("duration");
  	this.item.time = this.navParams.get("time");
  	this.item.address = this.navParams.get("address");
  	this.item.phone = this.navParams.get("phone");
  	this.item.uid = this.navParams.get("uid");
  	this.current = this.userdata.name;
  	this.item.latestbid = this.navParams.get("latestbid");
  	if (this.userdata.vc >= (this.item.price + this.item.bid)) this.can = true;
  	else this.can = false;
  	

  }
  chatApp() {
  	//this.navCtrl.push(ChatPage);
  	this.app.getRootNav().push(ChatPage, this.item);
  }

   showConfirm() {
    let confirm = this.alCtrl.create({
      title: 'Apakah kamu yakin ?',
      message: 'Barang yang telah dibid tidak bisa dicancel, klik yakin untuk melanjutkan',
      buttons: [
        {
          text: 'Tidak yakin',
          handler: () => {
            
          }
        },
        {
          text: 'Yakin',
          handler: () => {
            this.bidNow();
          }
        }
      ]
    });
    confirm.present();
  }


  bidNow() {
  	
  	if (this.userdata.vc >= (this.item.price + this.item.bid) && this.can == true) {
  		this.userdata.vc = this.userdata.vc - this.item.bid;
  		this.item.price = this.item.price + this.item.bid;
  		this.item.yourbid = this.item.yourbid + this.item.bid;
  		this.item.latestbid = this.userdata.name;
  		
  		if (this.userdata.vc < (this.item.price + this.item.bid))  this.can = false;

  		this.afAuth.authState.subscribe((data) => {
  			
  			this.val = this.afDb.object(`item/${this.item.uid}`);
  			this.val.update({price:this.item.price, latestbid:this.item.latestbid}).then(() => {
  				alert("Congratulation ! you win the latest bid. Your placed bid : " + this.item.yourbid);
  			});
  			this.us = this.afDb.object(`profile/${data.uid}`);
  			this.us.update({vc:this.userdata.vc});
  		});
  	}
  		else {
  			this.can = false;
  			alert("Maaf, VC anda tidak mencukupi");
  		}
  	
	}

}
