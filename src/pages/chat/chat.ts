import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { UserData } from "../../models/userdata";
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
	pesan:any;
	judul:string;
	foto:string;
	nama:string;
	messages:object[] = [];
	User:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth:AngularFireAuth,
  	public afDb:AngularFireDatabase, public userdata:UserData) {
  	this.judul = this.navParams.get("name");
  	this.nama = this.navParams.get("userName");
  	this.User = this.userdata.name;
  	this.foto = this.userdata.img;
  	this.afDb.list(`chat/${this.nama}-${this.judul}`).subscribe(data => {
  			this.messages = data;
  	});
  }

  kirim() {

  		this.afDb.list(`chat/${this.nama}-${this.judul}`).push({
  			user:this.userdata.name,
  			message:this.pesan,
  			pic:this.foto
  		}).then(() => {
  			this.pesan = "";
  		});
  	

  }
  

  

}
