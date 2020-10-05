import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private products: ProductResponsModel[] = []
  private serverUrl = environment.SERVER_URL;

constructor(private http:HttpClient) { }

getSingleOrder(orderId: number){
  return this.http.get<ProductResponsModel[]>(this.serverUrl + '/order'+orderId).toPromise();
}

}

interface ProductResponsModel {
  id: number;
  title: string;
  description: string;
  price:number;
  quantityOrder: number;
  image: string
}
