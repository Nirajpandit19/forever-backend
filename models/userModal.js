import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData:{
        type:Object,
        default:{},
    },
    // isAdmin: {
    //     type: Boolean,
    //     default: false,
    // },
},{minimize:false});
const userModal =
  mongoose.model.user || mongoose.model("user", userSchema);
export default userModal;