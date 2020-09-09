import { Component ,  ViewChild } from '@angular/core';
import { Platform , Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EarlyPage } from '../pages/early/early';
import { SettingPage } from '../pages/setting/setting';
import { TabsPage } from '../pages/tabs/tabs';
import { OnlinePage } from '../pages/online/online';
import { LogoutPage } from '../pages/logout/logout';
import { AuctionPage } from '../pages/auction/auction';
import { ChatPage } from '../pages/chat/chat';
import { MyauctionPage } from '../pages/myauction/myauction';

import { UserData } from '../models/userdata';
import { usersetting } from "../models/usersetting";
import { File } from "@ionic-native/file";
import { Transfer } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { User } from "../models/user";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = EarlyPage;
  @ViewChild(Nav) nav : Nav;
  pages:any;
  data: {
    name:string;
    img:string;
  } = {
    name:"",
    img:""
  };
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public file:File, public transfer:Transfer, public filepath:FilePath, public camera:Camera,
    public userdata:UserData, public afAuth:AngularFireAuth, public userr:User, public userset:usersetting,
    public afDb:AngularFireDatabase) {
    
    this.pages = [
      {title:"Profile", component:TabsPage},
      {title:"Setting", component:SettingPage},
      {title:"Online User", component:OnlinePage},
      {title:"Your Auction", component:MyauctionPage}
    ];

    this.data.name = this.userdata.name;
    this.data.img = this.userdata.img;

    //console.log(this.nav);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

    openPage(x) {

    this.nav.push(x.component);
  }
  
  
  

}