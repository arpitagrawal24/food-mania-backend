const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: String,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Invalid Phone Number");
      }
    },
  },
  message: {
    type: String,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
