const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res) => {
  res.send("Product Uploaded");
};

module.exports = {
  uploadProductImage,
};
