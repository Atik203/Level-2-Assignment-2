/*
 * Title: order.interface.ts
 * Description: order interface for the order module.
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */

export interface TOrder {
  email: string;
  productId: string;
  price: number;
  quantity: number;
}
