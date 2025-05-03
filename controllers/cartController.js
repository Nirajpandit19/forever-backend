import userModel from "../models/userModel.js";

// Add products to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// Update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = { ...userData.cartData }; // clone to avoid mutation issues

    // Check if itemId exists in cartData
    if (cartData[itemId]) {
      if (quantity === 0) {
        // Delete the size key
        delete cartData[itemId][size];

        // If no sizes left, delete the product entry
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      } else {
        // Update quantity
        cartData[itemId][size] = quantity;
      }

      // Ensure MongoDB gets clean object
      await userModel.findByIdAndUpdate(userId, { cartData });

      return res.json({ success: true, message: "Cart Updated" });
    }

    res.json({ success: false, message: "Item not found in cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// Get user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, getUserCart, updateCart };
