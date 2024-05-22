"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = exports.variantValidationSchema = void 0;
/*
 * Title: Product Zod Validation
 * Description: zod validation schema for the product module
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */
const zod_1 = require("zod");
exports.variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: 'Type cannot be empty' }),
    value: zod_1.z.string().min(1, { message: 'Value cannot be empty' }),
});
exports.productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Name cannot be empty' }),
    description: zod_1.z.string().min(1, { message: 'Description cannot be empty' }),
    price: zod_1.z.number().min(0, { message: 'Price cannot be negative' }),
    category: zod_1.z.string().min(1, { message: 'Category cannot be empty' }),
    tags: zod_1.z.array(zod_1.z.string().min(1, { message: 'Each tag cannot be empty' })),
    variants: zod_1.z.array(exports.variantValidationSchema),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number().min(0, { message: 'Quantity cannot be negative' }),
        inStock: zod_1.z.boolean(),
    }),
});
