import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  constructor(private http: HttpClient) { }

  productsSource = new BehaviorSubject([]);
  currentProducts = this.productsSource.asObservable();
  productsTmp = [];

  /* getProducts() {
     console.log('API CALLED');
     console.log("environment.apiUrl", environment.apiUrl + "/api/v1/products")
     this.http.get(`${environment.apiUrl}/api/v1/products`).subscribe((data: any) => {
       this.productsSource.next(data.products)
       this.productsTmp = data.products;
     });
   }*/

  getProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/products`);
  }

  searchProducts(searchText: string) {
    console.log("search text APi called with text ", searchText, "api url is", environment.apiUrl + 'api/v1/products');
    console.log(
      `${environment.apiUrl}/api/v1/products?keyword=${searchText}`
    );
    this.http.get(`${environment.apiUrl}/api/v1/products`,
      {
        params: { keyword: searchText }
      }).subscribe((data: any) => {
        this.productsSource.next(data.products)
      })
  }

  clearSearch(searchText: string) {
    if (searchText == '') {
      this.productsSource.next(this.productsTmp)
    }
  }

  getSingleProduct(id: string) {
    console.log("route ", environment.apiUrl + '/api/v1/product/' + id)
    return this.http.get(environment.apiUrl + '/api/v1/product/' + id)
  }

  orderCreate(order: any) {
    console.log("environment.apiUrl +'/api/v1/order'", environment.apiUrl + '/api/v1/order');
    console.log("environment.apiUrl +'/api/v1/order'", environment.apiUrl + 'api/v1/order')
    return this.http.post(environment.apiUrl + '/api/v1/order', order);
  }

}
