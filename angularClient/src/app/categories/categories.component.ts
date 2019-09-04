import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private httpClient : HttpClient) { }

  ngOnInit() {
    this.httpClient.get("http://localhost:3001/api/categories")
    .subscribe(
      (res)=>{
console.log('The categories list ',res)
      },
      (err)=>{
        console.log('The error is ',err)
      }
    )
  }

}
