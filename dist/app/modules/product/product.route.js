"use strict";
/*
 * Title: Product Route
 * Description: product route for the product module
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.get('/', product_controller_1.productController.getAllProduct);
router.post('/', product_controller_1.productController.createProduct);
router.get('/:id', product_controller_1.productController.getProductById);
router.put('/:id', product_controller_1.productController.updateProduct);
router.delete('/:id', product_controller_1.productController.deleteProduct);
exports.productRoute = router;
