import { routes } from './../app.routes';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../api';
import { Carts } from '../cart';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-detail',
  imports: [FormsModule, CommonModule, ToastrModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product: any = {};
  qty: number = 1;
  constructor(private route: ActivatedRoute,
    private apiService: Api,
    private cartService: Carts,
    private toastr: ToastrService,
     private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      console.log(data['id']);
      const id: string = data['id'];
      this.apiService.getSingleProduct(id).subscribe((data: any) => {
        this.product = data.product;
        console.log("datas", data.product);
         this.cdr.detectChanges(); 
      })
    })
    
  }

  decreaseQty() {
    if (this.qty == 1)
      return;
    this.qty -= 1;
  }

  increaseQty() {
    if (this.product.stock == this.qty) {
      return;

    }
    this.qty += 1;
  }

  addToCart() {
    const newCartItem = {
      product: this.product,
      qty: this.qty
    }

    if (this.product.stock == 0) {
      this.toastr.error('Cannot Add item due to Out of Stock','Amazoo');
      return;
    }

    //add cart item
    this.cartService.addItem(newCartItem);
    this.toastr.success('Product added to cart 🛒', 'Amazoo');
  }


}
