import { CartService } from './../../services/cart.service';
import { CartModelServer } from './../../models/cart.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  subTotal: number;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe((data: CartModelServer)=>{this.cartData = data});
    this.cartService.cartTotal$.subscribe(total => this.subTotal = total);
  }

  ChangeQuantity(index:number , increase: boolean){
    this.cartService.UpdateCartData(index,increase);
  }

}
