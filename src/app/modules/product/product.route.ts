import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.get('/', productController.getAllProduct);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export const productRoute = router;
