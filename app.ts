import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Api } from './api';
import { CommonModule } from '@angular/common';
import { Carts } from './cart';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  searchText: string = '';
  products: any[] = [];
  cartCount: number = 0;

  imageBaseUrl: any;
  tempProducts: any[] = [];
  constructor(private apiService: Api, private cartService: Carts) { }
  ngOnInit(): void {
    this.cartService.currentItems.subscribe((data: any) => {
      this.cartCount = data.length;
    })
  }

  protected readonly title = signal('frontend');

  search() {
    console.log("typed", this.searchText);
    this.apiService.searchProducts(this.searchText)
  }

  clearSearch() {
    this.apiService.clearSearch(this.searchText)
  }

  searchByEnterKey() {
    this.search();
  }
toggleTheme() {
  document.body.classList.toggle('dark');
}

}
