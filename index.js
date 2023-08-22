const express = require("express");
const cors = require("cors");
const connect = require("./db/connect");
const User = require("./db/models/User");

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect();

// Route to test the server
app.get("/", (req, res) => {
  res.send("Hello World! Server is up and running.");
});

// Route to signup a new user
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password });

    const savedUser = await newUser.save();
    res.status(200).send({
      message: "User registration successful.",
      userData: savedUser,
    });
  } catch (error) {
    console.log(`Error during user registration: ${error}`);
    res.status(500).send(`An error occurred. ${error}`);
  }
});

// Route to login a user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(404).send({ message: "User not found." });
    }
    if (userData.password !== password) {
      return res.status(401).send({
        message: "Incorrect password.",
      });
    }
    res.status(200).send({
      message: "Login successful.",
      userData,
    });
  } catch (error) {
    console.log(`error ${error}`);
    res.status(500).send(`An error occurred. ${error}`);
  }
});

// Route to add a new product
app.post("/addproduct", async (req, res) => {
  try {
    const { name, price, description, category, image, quantity, user } =
      req.body;
    const newProduct = new Product({
      name,
      user,
      price,
      image,
      quantity,
      category,
      description,
    });
    const savedProduct = await newProduct.save();
    res.status(200).send({
      message: "Product added successfully.",
      productData: savedProduct,
    });
  } catch (error) {
    console.log(`Error during product addition: ${error}`);
    res.status(500).send(`An error occurred. ${error}`);
  }
});

// Route to delete all documents in the "users" collection
app.get("/delete", async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.status(200).send({ message: "All documents deleted.", result });
  } catch (error) {
    console.log(`error ${error}`);
    res.status(500).send(`An error occurred. ${error}`);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
