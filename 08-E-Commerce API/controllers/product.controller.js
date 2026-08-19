const path = require("path");
const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const CustomError = require("../errors");
const Review = require("../models/Review");

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

  const product = await Product.findOne({ _id: productID }).populate("reviews");

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

  const product = await Product.findOne({ _id: productID });

  if (!product)
    throw new CustomError.NotFoundError(`No product with id : ${productID}`);

  await Review.deleteMany({
    product: product._id,
  });

  await product.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "Success! Product Removed." });
};

const uploadImage = async (req, res) => {
  // check if file is exists
  if (!req.files) {
    throw new CustomError.BadRequestError("No file uploaded");
  }

  const productImage = req.files.image;

  // check file type
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  // check size of file
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 1MB",
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`,
  );

  await productImage.mv(imagePath);

  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
