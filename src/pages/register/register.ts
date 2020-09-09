import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { UserData } from '../../models/userdata';
import { User } from '../../models/user';

import { LoginPage } from "../login/login";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
	new:{
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth:AngularFireAuth,
  	public userdata:UserData, public user:User, public afDb:AngularFireDatabase) {
  }

  ionViewDidLoad() {
    
  }

  async register(user : User) {
  	try {
  		const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  			if (result) {
  				this.userdata.email = user.email;
  				this.userdata.flag = false;

  				this.afAuth.authState.subscribe(data => {
  					this.new.email = user.email;
  					this.afDb.object(`profile/${data.uid}`).set(this.new).then(() => {

						this.navCtrl.setRoot(LoginPage);						  			
  					});
  				});

  			}
  	}
  	catch(e) {
  		console.error(e);
  	}
  	
  }

}
