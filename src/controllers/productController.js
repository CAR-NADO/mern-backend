import { Product } from "../models/product.model";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";

const productList = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json(new ApiResponse(200, products, "success"));
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, category, country_of_origin, price, stock, brand, description } = req.body;
  const requiredFields = {
    name,
    category,
    country_of_origin,
    price,
    stock,
    brand,
  };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value?.trim()) {
      throw new ApiError(400, `${key} is required`);
    }
  }
  const product = await Product.create({
    name,
    category,
    country_of_origin,
    price,
    stock,
    brand,
    description,
  });

  return res.status(200).json(new ApiResponse(200, product, "Product Created successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, country_of_origin, price, stock, brand, description, _id } = req.body;
  const requiredFields = {
    name,
    category,
    country_of_origin,
    price,
    stock,
    brand,
  };
  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value?.trim()) {
      throw new ApiError(400, `${key} is required`);
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { name, category, country_of_origin, price, stock, brand, description },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(new ApiResponse(200, updatedProduct, "Product Updated successfully"));
});

export { productList, createProduct, updateProduct };
