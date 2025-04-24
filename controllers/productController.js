// Function for add product
import { v2 as cloudinary } from "cloudinary";
import productModal from "../models/productModel.js";
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (img) => img !== undefined
    );
    let imagesUrl = await Promise.all(
      images.map(async (img) => {
        let result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      image: imagesUrl,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
    };
    console.log(productData);

const product = new productModal(productData);
    await product.save();

    res.json({success:true,message:"Product added successfully"});
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Function for list product

const listProduct = async (req, res) => {
  try {
    const products = await productModal.find({});
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Function for remove product

const removeProduct = async (req, res) => {
  try {
    await productModal.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// Function for single product information

const singleProductInfo = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModal.findById(productId);
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addProduct, listProduct, removeProduct, singleProductInfo };
