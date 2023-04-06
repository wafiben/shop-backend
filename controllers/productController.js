const Product = require("../models/product");

const getProduct = async (req, res) => {
  const { letter, id } = req.query;
  try {
    const products = await Product.find();
    if (letter) {
      const searchedProducts = products.filter((elt) =>
        elt.nameProduct.toLowerCase().includes(letter.toLowerCase())
      );
      if (searchedProducts.length === 0) {
        res.status(400).json({ msg: "no product with this name" });
      } else {
        res.status(200).json({ products: searchedProducts });
      }
    } else if (id) {
      const foundProduct = await Product.findById(id);
      console.log({ foundProduct });
      res.status(200).json({ products: foundProduct });
    } else {
      res.status(200).json({ products });
    }
  } catch (error) {
    res.status(500).json({ msg: "operationof gettAllPersons is failed" });
  }
};

const createProduct = async (req, res) => {
  const product = req.body;
  try {
    const newProduct = await new Product({
      nameProduct: product.nameProduct,
      price: product.price,
      unitType: product.unitType,
      quantity: product.quantity,
      SelectedFile: req.file.filename,
      user: req.user._id,
    });
    const newP = await newProduct.save();
    res.status(200).json({ id: newP._id });
  } catch (error) {
    res.status(500).json({ msg: "failed" });
  }
};

const modifyProduct = async (req, res) => {
  const product = req.body;
  const updatedProduct = {
    nameProduct: product.nameProduct,
    price: product.price,
    unitType: product.unitType,
    quantity: product.quantity,
  };
  const { id } = req.params;
  try {
    const updatedPost = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ product: updatedProduct });
  } catch (e) {
    res.status(500).json({ msg: "failed" });
  }
};
const deleteProdect = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ msg: "sucessfully deleted" });
  } catch (error) {
    res.status(500).json({ msg: "failed" });
  }
};

const getPostsOfUser = async (req, res) => {
  try {
    const allProducts = await Product.find();
    const productUser = allProducts.filter(
      (product) =>
        product.user && product.user.toString() === req.user._id.toString()
    );
    if (productUser.length > 0) {
      res.status(200).json({ products: productUser });
    } else {
      res.status(400).json({ msg: "you do not have any product" });
    }
  } catch (error) {
    res.status(500).json({ msg: "failed to get posts" });
  }
};

module.exports = { getProduct, createProduct, deleteProdect, modifyProduct, getPostsOfUser };
