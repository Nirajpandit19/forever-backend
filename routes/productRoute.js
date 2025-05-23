import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProductInfo,
} from "../controllers/productController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

// Route for adding a product
const productRouter = express.Router();

productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/add", adminAuth, addProduct);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", singleProductInfo);
productRouter.get("/list", listProduct);

export default productRouter;
