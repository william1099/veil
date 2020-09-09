import { Injectable } from '@angular/core';

@Injectable()
export class UserData {
	name:string = "anonymous";
	address:string="unknown";
	gender:string="unknown";
	country:string="unknown";
	phone:string="unknown";
	img:string = "unknown";
	email:string="";
	password:string="";
	vc:number=1000000;
	flag:boolean = false;

	constructor() {

	}
}