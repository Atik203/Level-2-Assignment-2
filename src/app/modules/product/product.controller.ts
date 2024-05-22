/*
 * Title: product.controller.ts
 * Description:  the controller functions for the product module.
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */
import { Request, Response } from 'express';
import { z } from 'zod';
import { TProduct } from './product.interface';
import { productService } from './product.service';
import { productValidationSchema } from './product.zod.validation';

// createProduct function is used to create a new product in the database.
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const zodParseProduct = productValidationSchema.parse(product);

    const result = await productService.createProductIntoDB(
      zodParseProduct as TProduct,
    );

    res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      data: result,
    });
  } catch (error: unknown) {
    // Check if the error is an instance of ZodError
    if (error instanceof z.ZodError) {
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
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};

// getAllProduct function is used to fetch all products from the database.
const getAllProduct = async (req: Request, res: Response) => {
  try {
    let result;

    const { searchTerm } = req.query;

    // Check if the searchTerm is present in the query . If present, fetch products based on the search term.
    if (searchTerm) {
      result = await productService.getProductBySearchFromDb(
        searchTerm as string,
      );
      // If the search term didn't match any products, return a 404 status code with a message.
      if (!result || result.length === 0) {
        res.status(404).json({
          success: false,
          message: `No products found matching search term '${searchTerm}'.`,
        });
        return;
      }
    } else {
      result = await productService.getAllProductsFromDB();
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};

// getProductById function is used to fetch a product by its id from the database.
const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await productService.getProductByIdFromDB(id);

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};

// updateProduct function is used to update a product in the database.
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = req.body;

    const zodParseProduct = productValidationSchema.parse(product);

    const result = await productService.updateProductIntoDB(
      id,
      zodParseProduct as TProduct,
    );

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
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.issues.map((issue) => issue.message).join(', '),
      });
    } else if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};

// deleteProduct function is used to delete a product from the database.
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await productService.deleteProductFromDB(id);

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};

export const productController = {
  getAllProduct,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
