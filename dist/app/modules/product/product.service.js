"use strict";
/*
 * Title: Product Service
 * Description: functions for the product module
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(product);
    return result;
});
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
const getProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
const updateProductIntoDB = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, product, { new: true });
    return result;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
const getProductBySearchFromDb = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, 'i'); // i for case insensitive
    // get all the product based on the search term
    const result = yield product_model_1.Product.find({
        $or: [{ name: regex }, { description: regex }, { category: regex }],
    });
    return result;
});
const updateProductStock = (product, newQuantity) => __awaiter(void 0, void 0, void 0, function* () {
    product.inventory.quantity = newQuantity;
    if (newQuantity === 0) {
        product.inventory.inStock = false;
    }
    yield product.save();
});
exports.productService = {
    createProductIntoDB,
    getAllProductsFromDB,
    getProductByIdFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
    getProductBySearchFromDb,
    updateProductStock,
};
