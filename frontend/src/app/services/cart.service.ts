import { Router } from '@angular/router';
import { CartModulePublic, CartModelServer } from './../models/cart.model';
import { environment } from './../../environments/environment';
import { OrderService } from './order.service';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private serverURL = environment.SERVER_URL;

  //data to store the cart info on client local storage
  private cartDataClient: CartModulePublic = {
    total: 0 ,
    prodData:[{
      incart: 0,
      id: 0
    }]
  }

  //data to store the cart info on server
  private cartDataServer: CartModelServer = {
  total: 0,
  data: [{
    numInCart: 0,
    product: undefined
  }]
};

  /** observeable for thecompoment to subscribe */
  cartTotals$: new BehaviorSubject<number>(0);
  cartData$: new BehaviorSubject<CartModelServer>(this.cartData);

  constructor(
    private httpClient: HttpClient,
    private productService: ProductService,
    private orderService: OrderService,
    private router:Router
  ) {
    this.cartTotals$.next(this.cartDataServer.total);
    this.cartData$.next(this.cartDataServer);

    // get info from local storage (if any)
    let info = JSON.parse(localStorage.getItem('cart'));

    //check if info is null or has some data in it 

    
    if (info !== null && info !== undefined && info.prodData[0].incart !== 0) {
      // assign the value to our data variable which corresponds to the LocalStorage data format
      this.cartDataClient = info;
      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach(p => {
        this.productService.getSingleProduct(p.id).subscribe((actualProdInfo: ProductModelServer) => {
          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = p.incart;
            this.cartDataServer.data[0].product = actualProdInfo;
            //this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            this.cartDataServer.data.push({
              numInCart: p.incart,
              product: actualProdInfo
            });
            // this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartDataObs$.next({...this.cartDataServer});
        });
      });
    }
  }
  }



}
