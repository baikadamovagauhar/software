import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RequestService {
  constructor(private http: HttpClient) {}
  public HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      Authorization: 'Basic ' + btoa(localStorage.getItem('user'))
    })
  };
  public Cors = {
    headers: new HttpHeaders( {
      'Access-Control-Allow-Origin' : '*',
    })
  };
  baseUrl = 'http://e9661ac1.ngrok.io/';

  getProduct(category) {
    if (category === null) {
      return this.http.get(`${this.baseUrl}/api/get-products`, this.Cors);
    }
    return this.http.get(`${this.baseUrl}/api/get-products?slug=` + category, this.Cors);
  }
  getCategory() {
    // return this.http.get(this.baseUrl + 'api/get-categories');
    return this.http.get(`${this.baseUrl}/api/get-categories`, this.Cors);
  }
  getPopularCategories() {
    return this.http.get(`${this.baseUrl}/api/get-popular-categories`, this.Cors);
  }
  getPopularProducts(address) {
    return this.http.get(`${this.baseUrl}/api/get-popular-products?address=` + address, this.Cors);
  }
  getProductByAddress(address) {
    return this.http.get(`${this.baseUrl}/api/get-store-products?address=` + address, this.Cors);
  }
  getShopList() {
    return this.http.get(`${this.baseUrl}/api/stores`);
  }
  Login(login, password, address) {
    return this.http.post(`${this.baseUrl}/api/login`, {login, password, address}, this.Cors);
  }
  Registration(login, password, email, phone) {
    return this.http.post(`${this.baseUrl}/api/registration`, {login, password, email, phone}, this.Cors);
  }
  MakeOrder(products, total, isCard, address, kv, dom, phone, name, surname, taken) {
    return this.http.post(`${this.baseUrl}api/make-order`, {products, total, isCard, address, kv, dom, phone, name, surname, taken}, this.HttpOptions);
  }
}
