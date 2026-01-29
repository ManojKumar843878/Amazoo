import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../api';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  products: any[] = [];
  constructor(private apiService: Api,
    private cdr: ChangeDetectorRef) { } // 👈 IMPORTANT) { }
  /*  ngOnInit(): void {
      this.apiService.getProducts()
      this.apiService.currentProducts.subscribe((data:any) => {
       this.products = data ?? [];
      })
   }*/

  ngOnInit(): void {
    console.log('HOME INIT');

    this.apiService.getProducts().subscribe({
      next: (res: any) => {
        console.log('API RESPONSE', res);

        this.products = res.products || [];
        console.log('PRODUCTS ARRAY', this.products);

        this.cdr.detectChanges(); // 👈 FORCE UI UPDATE
      },
      error: (err) => {
        console.error('API ERROR', err);
      }
    });
  }


  /*products = [{
      "_id": {
        "$oid": "69612658d15f5c62bb79d74b"
      },
      "name": "OPPO F21s Pro 5G",
      "price": 245.67,
      "description": "OPPO F21s Pro 5G is a powerful device with a RAM extension feature, that offers brilliant operational speed to users.",
      "ratings": 4.5,
      "images": [
        {
          "image": "/images/products/1.jpg"
        },
        {
          "image": "/images/products/2.jpg"
        }
      ],
      "category": "Mobile Phones",
      "seller": "Amazon",
      "stock": 15
    }, {
      "_id": {
        "$oid": "69612658d15f5c62bb79d74c"
      },
      "name": "WRISTIO HD, Bluetooth Calling Smart Watch",
      "price": 150.32,
      "description": "Minix watches are exclusively designed to fulfill the advanced tech needs of today’s generation.",
      "ratings": 3.5,
      "images": [
        {
          "image": "/images/products/2.jpg"
        }
      ],
      "category": "Accessories",
      "seller": "Flipkart",
      "stock": 9
    }]*/





}
