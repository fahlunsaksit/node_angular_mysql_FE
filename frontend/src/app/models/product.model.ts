export interface ProductModelServer {
    id: Number;
    name:String;
    category: String;
    description: String;
    price: Number;
    image:String;
    quantity: Number;
    images: String;
}
export interface ServerResponse {
    count: number;
    products: ProductModelServer[];
}
