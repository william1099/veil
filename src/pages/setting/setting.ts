import { Component } from '@angular/core';
import {  NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database-deprecated";

import { UserData } from '../../models/userdata';
import { usersetting } from "../../models/usersetting";
import { TabsPage } from "../tabs/tabs";

import { File } from "@ionic-native/file";
import { Transfer } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";
import { storage } from "firebase";
import firebase from "firebase";

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
	user:object = {};
	img:any = "";
	picUrl:any = "";
	pic:any;
	
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public afDb:AngularFireDatabase, public afAuth:AngularFireAuth, public userdata:UserData,
  	public act:ActionSheetController, public file:File, public camera:Camera, public filepath:FilePath,
  	public transfer:Transfer, public userr:usersetting) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  save(user) {
  	user.img = this.picUrl;
  	user.email = this.userdata.email;
  	user.vc = 100000;
  	user.flag = true;
  	this.afAuth.authState.subscribe(data => {
  		this.afDb.object(`profile/${data.uid}`).set(user).then(() => {
  			console.log(user);
  			this.userdata.name = user.name;
  			this.userdata.address = user.address;
  			this.userdata.country = user.country;
  			this.userdata.phone = user.phone;
  			this.userdata.gender = user.gender;
  			this.userdata.img = this.picUrl;
  			this.userdata.flag = true;

  			this.navCtrl.setRoot(TabsPage);
  		});
  	});
  }

  action() {
  	let actionSheet = this.act.create({
      title: 'Choose option',
      buttons: [
        {
          text: 'Use Camera',
          icon:'camera',
          cssClass:'actionStyle',
          role: 'destructive',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },{
          text: 'Select from library',
          cssClass:'actionStyle',
          icon:'images',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },{
          text: 'Cancel',
          cssClass:'actionCancel',
          role: 'cancel',
          icon:'close-circle',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  
	}
	setOption(srcType) {
		var options = {
			sourceType:srcType,
			destinationType:this.camera.DestinationType.DATA_URL,
			mediaType:this.camera.MediaType.PICTURE,
			encodingType:this.camera.EncodingType.JPEG,
			allowEdit:true,
			correctOrientation:true,
			quality:40
		}
		return options;
	}

	takePicture(srcType) {
		var opt = this.setOption(srcType);
		this.camera.getPicture(opt).then((imagedata) => {
			this.img = imagedata;
			this.userr.img = imagedata;

			let str = firebase.storage().ref("pictures/");

  			this.afAuth.authState.subscribe((data) => {
				str.child(data.uid).child("profile.jpg").putString(`data:image/jpeg;base64,${imagedata}`, "data_url").then((im) => {
	  				this.picUrl = im.downloadURL;
	  			});  				
  			});


			alert("Upload Succesful");
		}, () => {
			console.debug("error : unable to optain picture");
		});
	}

  
}
