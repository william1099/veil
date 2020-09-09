import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SettingPage } from '../pages/setting/setting';
import { ChatPage } from '../pages/chat/chat';
import { EarlyPage } from '../pages/early/early';
import { OnlinePage } from '../pages/online/online';
import { LogoutPage } from '../pages/logout/logout';
import { AuctionPage } from '../pages/auction/auction';
import { ForumPage } from '../pages/forum/forum';
import { ItemPage } from '../pages/item/item';
import { HelpPage } from '../pages/help/help';
import { MyauctionPage } from "../pages/myauction/myauction";


import { config } from './app.config';
import {  UserData } from '../models/userdata';
import {  User } from '../models/user';
import {  usersetting } from '../models/usersetting';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';

import firebase from "firebase";
import { Facebook } from '@ionic-native/facebook';

import { File } from "@ionic-native/file";
import { Transfer } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";


firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    SettingPage,
    ChatPage,
    EarlyPage,
    ItemPage,
    LogoutPage,
    AuctionPage,
    ForumPage,
    HelpPage,
    OnlinePage,
    MyauctionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    SettingPage,
    ChatPage,
    EarlyPage,
    ItemPage,
    LogoutPage,
    AuctionPage,
    ForumPage,
    HelpPage,
    OnlinePage,
    MyauctionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserData,
    Facebook,
    File,
    Transfer,
    Camera,
    FilePath,
    usersetting,
    User
  ]
})
export class AppModule {}
