import { Component } from '@angular/core';
import {  NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database-deprecated";

import { UserData } from '../../models/userdata';
import { usersetting } from "../../models/usersetting";
import { TabsPage } from "../tabs/tabs";
import { AuctionPage } from "../auction/auction";

import { File } from "@ionic-native/file";
import { Transfer } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";
import * as moment from "moment";
import { storage } from "firebase";
import firebase from "firebase";


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	img:any = "";
	picUrl:any = "";
	pic:any;	
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
		latestbid:"",
		uid:""
	};
	

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public afDb:AngularFireDatabase, public afAuth:AngularFireAuth, public userdata:UserData,
  	public act:ActionSheetController, public file:File, public camera:Camera, public filepath:FilePath,
  	public transfer:Transfer, public userr:usersetting) {
  }

  save(item) {
  	this.get(); 
  	this.item.userPic = this.userdata.img;
  	this.item.userName = this.userdata.name;
  	this.item.phone = this.userdata.phone;
  	this.item.address = this.userdata.address;
  	this.item.img = this.picUrl;
  	
  	this.afAuth.authState.subscribe(data => {
  		this.item.uid = data.uid;
  		this.afDb.object(`item/${data.uid}`).set(this.item).then(() => {

  			this.navCtrl.setRoot(AuctionPage);
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
            console.log('Destructive clicked');
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

			let str = firebase.storage().ref("item/");

  			this.afAuth.authState.subscribe((data) => {
				str.child(data.uid).child("item.jpg").putString(`data:image/jpeg;base64,${imagedata}`, "data_url").then((im) => {
	  				this.picUrl = im.downloadURL;
	  			});  				
  			});


			alert("Upload Succesful");
		}, () => {
			console.debug("error : unable to optain picture");
		});
	}

	get() {
	  	let hari = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	  	let hariUser = this.item.duration.split("-");
	  	let bulanUser = parseInt(hariUser[1], 10);
	  	let tanggalUser = parseInt(hariUser[2], 10);
	  	let jum1 = hari[bulanUser - 1] + tanggalUser;
	  	let harNow = moment().format("DD-MM-YYYY");
	  	this.item.userTimeStart = harNow;
	  	let hariNow = harNow.split("-");
	  	let tanggalNow = parseInt(hariNow[0], 10);
	  	let bulanNow = parseInt(hariNow[1], 10);
	  	let jum2 = hari[bulanNow - 1] + tanggalNow;
	  	let ans = Math.abs(jum2 - jum1);
	  	this.item.time = ans;

  }

}
