import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ItemPage } from "../item/item";
import { ChatPage } from "../chat/chat";
import { AboutPage } from "../about/about";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database-deprecated";

/**
 * Generated class for the AuctionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-auction',
  templateUrl: 'auction.html',
})
export class AuctionPage {
	List:any;
	itemList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth:AngularFireAuth,
  	public afDb:AngularFireDatabase) {
  	this.afAuth.authState.subscribe(data => {
	  		this.afDb.object(`item`).subscribe(data => {
	  			this.List = data;
	  			this.itemList = Object.keys(this.List);
	  		});
	 });	
  }

  viewItem(listbrg) {
  	console.log(listbrg);
  	this.navCtrl.push(ItemPage, listbrg);
  }
  chatApp() {
  	this.navCtrl.push(ChatPage);
  }

  addItem() {
  	this.navCtrl.push(AboutPage);
  }

}
