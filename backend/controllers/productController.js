import Product from "../models/Product.js";

// @desc  Get all products with filters
// @route GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, minRating } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single product
// @route GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Create product (admin)
// @route POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    if (!name || price == null || countInStock == null) {
      return res.status(400).json({ message: "name, price and countInStock are required" });
    }

    const product = await Product.create({ name, price, description, image, brand, category, countInStock });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update product (admin)
// @route PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Use ?? so price/countInStock of 0 still updates correctly
    product.name         = req.body.name         ?? product.name;
    product.price        = req.body.price        ?? product.price;
    product.description  = req.body.description  ?? product.description;
    product.image        = req.body.image        ?? product.image;
    product.brand        = req.body.brand        ?? product.brand;
    product.category     = req.body.category     ?? product.category;
    product.countInStock = req.body.countInStock ?? product.countInStock;

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Delete product (admin)
// @route DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};