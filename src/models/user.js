const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const { decryptAndComparePassword } = require("../utils/password");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100
    },
    lastName: String,
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if(!validator.isEmail(value)) {
          throw new Error("Invalid email id!");
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if(!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password!");
        }
      }
    },
    age: {
      type: Number,
      min: 18,
      max: 140
    },
    gender: {
      type: String,
      validate(value) {
        if (!["Male", "Female", "Others"].includes(value)) {
          throw new Error("Gender data is not valid!");
        }
      }
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if(!validator.isURL(value)) {
          throw new Error("Your photo URL is not valid!");
        }
      }
    },
    about: {
      type: String,
      default: "This is the default bio"
    },
    skills: {
      type: [String]
    },
  }, 
  { 
    timestamps: true 
  }
);

// Schema methods

// Always use normal functions and avoid using arrow functions to get the reference of this
userSchema.methods.getJWT = async function () { 
  const user = this; 
  const token = await jwt.sign({ _id: user._id }, '$ATH-DEV-TINDER', 
    { expiresIn: "7d" }
  );
  return token;
};

userSchema.methods.validatePassword = async function (userInputPassword) {
  const user = this;
  const isPasswordCorrect = await decryptAndComparePassword(userInputPassword, user.password)
  return isPasswordCorrect;
}

const User = mongoose.model("User", userSchema);

module.exports = User;