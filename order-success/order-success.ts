import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [],
  templateUrl: './order-success.html',
  styleUrl: './order-success.css',
})
export class OrderSuccess implements OnInit {

  orderId: number = 0;

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      this.orderId = data['id']
    })
  }
}
