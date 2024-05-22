"use strict";
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
exports.productController = void 0;
const zod_1 = require("zod");
const product_service_1 = require("./product.service");
const product_zod_validation_1 = require("./product.zod.validation");
// createProduct function is used to create a new product in the database.
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const zodParseProduct = product_zod_validation_1.productValidationSchema.parse(product);
        const result = yield product_service_1.productService.createProductIntoDB(zodParseProduct);
        res.status(201).json({
            success: true,
            message: 'Product created successfully.',
            data: result,
        });
    }
    catch (error) {
        // Check if the error is an instance of ZodError
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                success: false,
                // Map through the issues array and join the messages with a comma.
                message: error.issues.map((issue) => issue.message).join(', '),
            });
        }
        // Check if the error is an instance of Error
        else if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: error.message,
                hello: 'hello',
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
            });
        }
    }
});
// getAllProduct function is used to fetch all products from the database.
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        const { searchTerm } = req.query;
        // Check if the searchTerm is present in the query . If present, fetch products based on the search term.
        if (searchTerm) {
            result = yield product_service_1.productService.getProductBySearchFromDb(searchTerm);
            // If the search term didn't match any products, return a 404 status code with a message.
            if (!result || result.length === 0) {
                res.status(404).json({
                    success: false,
                    message: `No products found matching search term '${searchTerm}'.`,
                });
                return;
            }
        }
        else {
            result = yield product_service_1.productService.getAllProductsFromDB();
            // If there are no products at all, return a 404 status code with a message.
            if (!result || result.length === 0) {
                res.status(404).json({
                    success: false,
                    message: 'No products found.',
                });
                return;
            }
        }
        res.status(200).json({
            success: true,
            message: searchTerm
                ? `Products matching search term '${searchTerm}' fetched successfully!`
                : 'Products fetched successfully.',
            data: result,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
            });
        }
    }
});
// getProductById function is used to fetch a product by its id from the database.
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield product_service_1.productService.getProductByIdFromDB(id);
        if (!result) {
            res.status(404).json({
                success: false,
                message: 'Product not found.',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully.',
            data: result,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
            });
        }
    }
});
// updateProduct function is used to update a product in the database.
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = req.body;
        const zodParseProduct = product_zod_validation_1.productValidationSchema.parse(product);
        const result = yield product_service_1.productService.updateProductIntoDB(id, zodParseProduct);
        if (!result) {
            res.status(404).json({
                success: false,
                message: 'Product not found.',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Product updated successfully.',
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                success: false,
                message: error.issues.map((issue) => issue.message).join(', '),
            });
        }
        else if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
            });
        }
    }
});
// deleteProduct function is used to delete a product from the database.
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield product_service_1.productService.deleteProductFromDB(id);
        if (!result) {
            res.status(404).json({
                success: false,
                message: 'Product not found.',
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully.',
            data: null,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
            });
        }
    }
});
exports.productController = {
    getAllProduct,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};
