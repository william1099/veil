import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { UserData } from "../../models/userdata";
import { User } from "../../models/user";
import { usersetting } from "../../models/usersetting";

import { HomePage } from "../home/home";
import { EarlyPage } from "../early/early";
import { SettingPage } from "../setting/setting";
import { TabsPage } from "../tabs/tabs";
import firebase from "firebase";


import { Facebook } from "@ionic-native/facebook";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	
	flag:boolean = false;
	isLoggedIn:boolean;
	userfb:{
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
		email:"",
		img:"",
		address:"",
		country:"",
		gender:"",
		phone:"",
		vc:1000000,
		flag:false
	};
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth:AngularFireAuth,
  	public userdata:UserData, public fb:Facebook, public afDb:AngularFireDatabase,
  	public user:User, public userset:usersetting) {


  	this.fb.getLoginStatus().then((res) => {
  		if (res.status == "connect" || res.status == "connected") this.isLoggedIn = true;
  		else this.isLoggedIn = false;
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user : User) {
  	const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  	if (result) {
  		this.afAuth.authState.subscribe(data => {
	  		this.afDb.object(`profile/${data.uid}`).subscribe(data => {
	  			if (data.flag == false) {
	  				this.navCtrl.setRoot(SettingPage);
	  			}
	  			else if (data.flag == true) {
	  				this.userdata.name =  data.name;
		  			this.userdata.address =  data.address;
		  			this.userdata.country = data.country;
		  			this.userdata.gender = data.gender;
		  			this.userdata.phone = data.phone;
		 			this.userdata.img = data.img;
		  			this.userdata.flag = data.flag;
		  			this.userdata.email = data.email;
		  			this.userdata.vc = data.vc;
		  			this.navCtrl.setRoot(HomePage);
	  			}
			});
	  	});
  	}
  	else {
  		alert("Wrong email or password");
  		this.navCtrl.setRoot(EarlyPage);
  	}
  }

  loginFb() {

  	this.fb.login(["email", "public_profile", "user_friends"]).then((res) => {
  		const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);

  		firebase.auth().signInWithCredential(credential).then((res) => {

  			//alert(JSON.stringify(res));
  			this.userdata.name = res.displayName;
  			this.userdata.img = res.photoUrl;
  			this.userdata.phone = res.phoneNumber;
  			this.userdata.email = res.email;

  			this.userfb.name = res.displayName;
  			this.userfb.img = res.photoUrl;
  			this.userfb.phone = res.phoneNumber;
  			this.userfb.email = res.email;

  			
  			this.navCtrl.setRoot(HomePage);

  		});
  	});
  }
}
