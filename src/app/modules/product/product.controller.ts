import { Request, Response } from 'express';
import { z } from 'zod';
import { productService } from './product.service';
import { productValidationSchema } from './product.zod.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const zodParseProduct = productValidationSchema.parse(product);

    const result = await productService.createProductIntoDB(zodParseProduct);

    res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.issues.map((issue) => issue.message).join(', '),
      });
    } else if (error instanceof Error) {
      console.log(error);
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

const getAllProduct = async (req: Request, res: Response) => {
  try {
    let result;

    const { searchTerm } = req.query;
    if (searchTerm) {
      result = await productService.getProductBySearchFromDb(
        searchTerm as string,
      );
    } else {
      result = await productService.getAllProductsFromDB();
    }

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Products not found.',
      });
      return;
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
      console.log(error);
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
      console.log(error);
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = req.body;

    const zodParseProduct = productValidationSchema.parse(product);

    const result = await productService.updateProductIntoDB(
      id,
      zodParseProduct,
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
      console.log(error);
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
      console.log(error);
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
