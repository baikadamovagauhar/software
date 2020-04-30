import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://d6033da0.ngrok.io/';

  getProduct(category) {
    if (category === null) {
      return this.http.get(`${this.baseUrl}/api/get-products`);
    }
    return this.http.get(`${this.baseUrl}/api/get-products?slug=` + category);
  }
  getCategory() {
    // return this.http.get(this.baseUrl + 'api/get-categories');
    return this.http.get(`${this.baseUrl}/api/get-categories`);
  }
  getPopularCategories() {
    return this.http.get(`${this.baseUrl}/api/get-popular-categories`);
  }
  getPopularProducts(address) {
    return this.http.get(`${this.baseUrl}/api/get-popular-products?address=` + address);
  }
  getProductByAddress(address) {
    return this.http.get(`${this.baseUrl}/api/get-store-products?address=` + address);
  }
  getShopList() {
    return this.http.get(`${this.baseUrl}/api/stores`);
  }
  Login(login, password, address) {
    return this.http.post(`${this.baseUrl}/api/login`, {login, password, address});
  }
  Registration(login, password, email, phone) {
    return this.http.post(`${this.baseUrl}/api/registration`, {login, password, email, phone});
  }
}
