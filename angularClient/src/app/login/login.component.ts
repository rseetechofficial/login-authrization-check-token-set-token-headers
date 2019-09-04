import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
private user : any={};
  constructor(private router : Router,private httpClient : HttpClient) { }

  ngOnInit() {
  }

  checkLogin(){
		console.log('The login data is ',this.user);
		this.httpClient.post("http://localhost:3001/api/login",this.user).subscribe(
	  (res : any)=>{
		alert("login");
		console.log('The login response is ',res.token);
		localStorage.setItem('token',res.token);
		alert("haiiiii");
		this.router.navigate(['/home'])
	  },
	  (err)=>{
		console.log('The error is ',err);
	  }
		)
	  }

}
