import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ForumPage } from "../forum/forum";
import { UserData } from "../../models/userdata";
import { AngularFireAuth } from "angularfire2/auth";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	flag1:boolean = false;
	flag2:boolean = false;
	flag3:boolean = false;
	data: { 
		name: string; 
		address:string;
		country:string;
		phone:string;
		email:string;
		gender:string;
		img:string;
		flag:boolean;
		vc:number;
	} = {
		name:"",
		address:"",
		country:"",
		phone:"",
		email:"",
		gender:"",
		img:"",
		flag:false,
		vc:0
	};

  constructor(public navCtrl: NavController, public userdata:UserData, public afAuth:AngularFireAuth) {
  		this.data.name = this.userdata.name;
  	this.data.address = this.userdata.address;
  	this.data.country = this.userdata.country;
  	this.data.phone = this.userdata.phone;
  	this.data.email = this.userdata.email;
  	this.data.gender = this.userdata.gender;
  	this.data.img = this.userdata.img;
  	this.data.flag = this.userdata.flag;
  	this.data.vc = this.userdata.vc;
  }

  Flag1() {
  	this.flag1 = true; this.flag2 = false; this.flag3 = false;
  }
  Flag2() {
  	this.flag1 = false; this.flag2 = true; this.flag3 = false;	
  }
  Flag3() {
  	this.flag1 = false; this.flag2 = false; this.flag3 = true;	
  }

  forum() {
  	this.navCtrl.push(ForumPage);
  }

  
}
