import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private httpClient : HttpClient) { }

  ngOnInit() {
//     let headers: HttpHeaders = new HttpHeaders();
//     var tokenVal=localStorage.getItem("token");
// headers = headers.append('token',tokenVal );
    this.httpClient.get("http://localhost:3001/api/products")
    .subscribe(
      (res)=>{
console.log('The products list ',res)
      },
      (err)=>{
        console.log('The error is ',err)
      }
    )
  }

}
