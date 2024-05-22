/*
 * Title: Product Route
 * Description: product route for the product module
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */

import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.get('/', productController.getAllProduct);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export const productRoute = router;
