const Product = require("../models/product");
const User = require('../models/User')

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
  console.log('there')
  const product = req.body;
  try {
    const newProduct = await new Product({
      nameProduct: product.nameProduct,
      price: product.price,
      unitType: product.unitType,
      quantity: product.quantity,
      show: product.show,
      SelectedFile: req.file.filename,
      user: req.user._id,
    });
    const user = await User.findById(req.user._id).populate('products');
    user.products.push(newProduct);
    await user.save()
    await newProduct.save();
    res.status(200).json({ user })
    /*    res.status(200).json({ id: newP._id }); */
  } catch (error) {
    res.status(500).json({ msg: "failed" });
  }
};

const modifyProduct = async (req, res) => {
  const product = req.body;
  const { id } = req.params;
  try {
    let productForUpdated = {
      nameProduct: product.nameProduct,
      price: product.price,
      unitType: product.unitType,
      quantity: product.quantity,
      SelectedFile: req.file.filename,
      user: req.user._id.toString(),
    };
    const updatedProduct = await Product.findByIdAndUpdate(id, productForUpdated, {
      new: true,
    });
    res.status(200).json({ product: updatedProduct });
  } catch (e) {
    res.status(500).json({ msg: "update is failed" });
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

const getProductsOfCompany = async (req, res) => {//myposts
  try {
    const productUser = await Product.find({ user: { $eq: req.user._id.toString() } });
    if (productUser.length !== 0) {
      return res.status(200).json({ products: productUser });
    } else {
      res.status(400).json({ msg: "you do not have any product" });
    }
  } catch (error) {
    res.status(500).json({ msg: "failed to get products" });
  }
};
const getProductsOfSpeceficCompany = async (req, res) => {
  try {
    const idOfCompany = req.params.id;
    const products = await Product.find({ user: { $eq: idOfCompany } });
    if (products.length !== 0) {
      res.status(200).json({ products: products });
    } else if (products.length === 0) {
      res.status(300).json({ msg: "this company does not have any products yet" });
    }
  } catch (error) {
    res.status(500).json({ msg: "get  product of company is failed" });
  }
}
const handleShowProduct = async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id);
    const update = product.show ? false : true
    const updatedProduct = { ...product._doc, show: update }
    const doc = await Product.findOneAndUpdate({ _id: id }, updatedProduct, {
      new: true
    });
    const products = await Product.find({ user: { $eq: req.user._id } });
    res.status(200).json({ products })
  } catch (error) {
    res.status(500).json({ msg: "show  product is failed" });
  }
}

module.exports = { getProduct, createProduct, deleteProdect, modifyProduct, getProductsOfCompany, getProductsOfSpeceficCompany, handleShowProduct };
