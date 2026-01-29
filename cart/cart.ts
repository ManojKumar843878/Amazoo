import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Carts } from '../cart';
import { Api } from '../api';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule,ToastrModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartItems: any[] = []
  cartCount: number = 0;
  subTotal: number = 0;
  estTotal: number = 0;

  constructor(private cartService: Carts, 
    private apiService: Api,
    private router:Router ,
    private toastrservice:ToastrService 
  ) { }

  ngOnInit(): void {

    this.cartService.currentItems.subscribe((data: any) => {
      this.cartItems = data;
    })

    this.calculateCartItems();
  }

  deleteItem(product_id: string) {

    // product_id = Number(product_id)
    console.log("id is", product_id)
    const previouseItem: any = this.cartItems.find((item: any) => item.product._id === product_id);
    if (previouseItem) {
      const filteredItem = this.cartItems.filter((item: any) => { console.log("item.product._id", item.product._id, "previouseItem.product._id", previouseItem.product._id); return item.product._id !== previouseItem.product._id });
      console.log("filtered", filteredItem, "this.cartItems", this.cartItems);
      this.cartItems = filteredItem;
      this.cartService.updateItems(filteredItem);
    }
    console.log("product_id", product_id, " previouseItem", previouseItem, "filteredItem", this.cartItems);
    this.calculateCartItems();
  }

  calculateCartItems() {
    console.log("id is", this.cartItems)
    this.cartCount = this.cartItems.length;
    this.subTotal = this.cartItems.reduce((acc: any, current: any) => {
      return Math.round(acc + current.qty);
    }, 0);
    this.estTotal = this.cartItems.reduce((acc: any, current: any) => {
      return Math.round(acc + (current.product.price * current.qty));
    }, 0);

  }
  decreaseQty(product_id: any) {
    const previouseCartItem: any = this.cartItems.find((item: any) => item.product._id === product_id);
    let qty = previouseCartItem.qty;
    if (qty == 1)
      return;
    qty -= 1;

    if (previouseCartItem) {
      //update item qty
      this.cartItems.map((item: any) => {
        if (item.product._id == previouseCartItem.product._id) {
          item.qty = qty;
        }
        return item;
      })
    }
    this.cartService.updateItems(this.cartItems);
    this.calculateCartItems();
  }

  increaseQty(product_id: any) {
    const previouseCartItem: any = this.cartItems.find((item: any) => item.product._id === product_id);
    let qty = previouseCartItem.qty;
    if (previouseCartItem.product.stock == qty) {
        this.toastrservice.error('Cannot Add item due to Out of Stock','Amazoo');
     
      return;

    }
    qty += 1;
    if (previouseCartItem) {
      //update item qty
      this.cartItems.map((item: any) => {
        if (item.product._id == previouseCartItem.product._id) {
          item.qty = qty;
        }
        return item;
      })
    }
    this.cartService.updateItems(this.cartItems);
    this.calculateCartItems();
  }

  orderComplete() {
    //api call
    const order = this.cartItems;
    console.log("order",order)
    this.apiService.orderCreate(order).subscribe((data:any)=>{
      if(data.success == true){
        const orderId = data.order._id;
        //navigation
       console.log("orderId",orderId);
       this.router.navigate(['order','success',orderId])
       this.cartService.updateItems([]);
      }

    });



  }
}
