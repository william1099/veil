import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the EarlyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-early',
  templateUrl: 'early.html',
})
export class EarlyPage {
	
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  
  }

  login() {
  	this.navCtrl.push(LoginPage);
  }
  register() {
  	this.navCtrl.push(RegisterPage);
  }
  
}
