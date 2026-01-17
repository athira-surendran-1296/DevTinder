const mongoose = require("mongoose");
const validator = require("validator");

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

const User = mongoose.model("User", userSchema);

module.exports = User;