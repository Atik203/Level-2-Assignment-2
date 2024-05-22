"use strict";
/*
 * Title: Order Zod Validation
 * Description: zod validation schema for the order module
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchemaZod = void 0;
const zod_1 = require("zod");
exports.orderValidationSchemaZod = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    productId: zod_1.z.string().nonempty({ message: 'Product ID is required' }),
    price: zod_1.z.number().min(0, { message: 'Price must be a positive number' }),
    quantity: zod_1.z
        .number()
        .int()
        .min(1, { message: 'Quantity must be an integer greater than 0' }),
});
