import { ProductModelServer } from './product.model';
export interface CartModelServer {
    total: number;
    data: [{
        product: ProductModelServer,
        numInCart: number
    }]
}

export interface CartModulePublic {
    total: number;
    productData: [{
        id:number,
        incart: number
    }]
}
