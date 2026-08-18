const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const CustomError = require("../errors");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;

  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ count: products.length, products });
};
const getSingleProduct = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.findOne({ _id: productID });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productID}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.findByIdAndUpdate(
    { _id: productID },
    req.body,
    { returnDocument: "after" },
  );

  if (!product)
    throw new CustomError.NotFoundError(`No product with id : ${productID}`);

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.findByIdAndDelete({ _id: productID });

  if (!product)
    throw new CustomError.NotFoundError(`No product with id : ${productID}`);

  res.status(StatusCodes.OK).json({ msg: "Success! Product Removed." });
};

const uploadImage = async (req, res) => {
  res.send("upload image for product");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
