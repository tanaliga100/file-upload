const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { BadRequestError } = require("../errors");

const uploadProductImage = async (req, res) => {
  // ADD VALIDATIONS HERE
  // check if files exitst
  if (!req.files) {
    throw new BadRequestError("No files to upload");
  }
  // check format
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload an image");
  }
  const maxSize = 1000;
  // check size
  if (productImage.size > maxSize) {
    throw new BadRequestError("Please upload an image smaller than 1KB");
  }
  // end
  const imagePath = path.join(
    __dirname,
    "../public/uploads/",
    `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = {
  uploadProductImage,
};
