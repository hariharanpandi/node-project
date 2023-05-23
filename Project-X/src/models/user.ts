import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import AppConstants from "../utils/appconstants";

const appConstant = new AppConstants();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    enum: [appConstant.SCHEMA.STATUS_ACTIVE, appConstant.SCHEMA.STATUS_INACTIVE],
    default: appConstant.SCHEMA.STATUS_ACTIVE,
  },
},{ collection: appConstant.SCHEMA.USERS_COLLEECTION_NAME });

export const generateAuthToken = function (userData: any) {
  return jwt.sign(
    {
      id: userData._id,
      name: userData.name,
      email: userData.email,
      isAdmin: userData.isAdmin ? userData.isAdmin : false,
    },
    `${process.env.ACCESS_TOKEN_SECRET}`
  ),{expireIn: appConstant.SCHEMA.TOKEN_EXPIRE_TIME};
};
export const User = mongoose.model("User", userSchema);

module.exports.User = User;
module.exports.userSchema = userSchema;

// Get All User
export const getAllUsers = () => User.find({ status: appConstant.SCHEMA.STATUS_ACTIVE });

// Create User
export const createUser = (values: Record<string, any>) =>
  new User(values).save().then((user) => user.toObject());

// Find user By Email
export const findByEmail = (email: string) => User.findOne({ email });
