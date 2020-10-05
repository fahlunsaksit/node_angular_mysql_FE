import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModelServer, ServerResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
   private SERVER_URL = environment.SERVER_URL; //http://localhost:3000/api
  constructor(private http: HttpClient) {}

  //Fetch data
  getAllProducts(numberOfResults = 10) : Observable<ServerResponse>{
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products', {
      params: {
        limit: numberOfResults.toString()
      },
    });
  }

  getSingleProduct(id: number): Observable<ProductModelServer>{
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/products'+id);
  }

  getProductFromCategory(catName: String): Observable<ProductModelServer[]>{
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + 'products/category/'+catName)
  }
}
