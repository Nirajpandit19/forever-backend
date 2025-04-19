// Function for add product
import { v2 as cloudinary } from "cloudinary";
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

    console.log(images);
    console.log(
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestseller
    );
    console.log(image1, image2, image3, image4);
    res.json({});
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Function for list product

const listProduct = async (req, res) => {};

// Function for remove product

const removeProduct = async (req, res) => {};
// Function for single product information

const singleProductInfo = async (req, res) => {};

export { addProduct, listProduct, removeProduct, singleProductInfo };
