import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Carts {
  constructor() { }

  itemSource = new BehaviorSubject([]);
  currentItems = this.itemSource.asObservable();
  cartItems: any = []
  addItem(newCartItem: any) {
    const previouseCartItem = this.cartItems.find((el: any) => el.product._id == newCartItem.product._id);

    if (previouseCartItem) {
      //update item qty
       this.cartItems.map((item:any)=>{
        if(item.product._id==previouseCartItem.product._id){
          item.qty +=1;
        }
        return item;
       })


    } else {
      this.cartItems.push(newCartItem);
    }

    this.itemSource.next(this.cartItems);
  }

  updateItems(items: any[]) {
    this.cartItems =items;
    this.itemSource.next(this.cartItems);
  }
  
  

}
