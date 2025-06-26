export interface ProductOrderItem {
    id: number;
    sap: string;
    name: string;
    price: number;
    quantity: number;
    unitQuantity: string;
    image: string;
}

export interface ProductOrder {
    totalAmount: number;
    items: ProductOrderItem[];
}
