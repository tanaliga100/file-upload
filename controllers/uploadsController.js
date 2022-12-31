const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { BadRequestError } = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadProductImageLocal = async (req, res) => {
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

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ img: { src: result.secure_url } });
};

module.exports = {
  uploadProductImage,
};
