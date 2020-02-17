import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }
  baseUrl='http://fc5aa445.ngrok.io/';
  getCategory(){
    // return this.http.get(this.baseUrl + 'api/get-categories');
    return this.http.get(`${this.baseUrl}/api/get-categories`)
  }
  getPopularCategories(){
    return this.http.get(`${this.baseUrl}/api/get-popular-categories`)
  }
  getPopularProducts(){
    return this.http.get(`${this.baseUrl}/api/get-popular-products`)
  }
}
