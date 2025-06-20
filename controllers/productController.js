const Product = require("../models/product");
const User = require("../models/User");
const mongoose = require("mongoose");

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ msg: "get product failed" });
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
      show: product.show,
      SelectedFile: req.file.filename,
      user: req.user._id,
    });
    const user = await User.findById(req.user._id).populate("products");
    user.products.push(newProduct);
    await user.save();
    await newProduct.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: "failed" });
  }
};

const modifyProduct = async (req, res) => {
  const productInfo = req.body;
  const { id } = req.params;
  try {
    let productForUpdated = {
      nameProduct: productInfo.nameProduct,
      price: Number(productInfo.price),
      unitType: productInfo.unitType,
      quantity: Number(productInfo.quantity),
      SelectedFile: req.file.filename,
      user: req.user._id,
    };
    const product = await Product.findById(id);
    const updatedProduct = { ...product._doc, ...productForUpdated };
    const doc = await Product.findOneAndUpdate({ _id: id }, updatedProduct, {
      new: true,
    });
    const user = await User.findById(req.user.id).populate("products");
    res.status(200).json({ products: user.products });

    // Update product in the User's document
    /*const user=await User.findById(req.user._id).populate('products');*/
    /*	const element=user.products.find((elt) => elt.id.toString()===id);*/
    /*	await Product.findByIdAndDelete(id)
			await user.products.pull(id);
			user.products.push(productForUpdated)
			return res.status(200).json({user})*/
    /*console.log("===>",user)*/

    /*console.log(element);*/
    /*console.log({index})*/
    /*	if(index!==-1) {
				console.log('sssss')
				user.products.splice(index,1,productForUpdated);
				updatedUser=await user.save();
			}*/

    /*res.status(200).json({products: updatedUser.products});*/
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: "update is failed" });
  }
};

const getPro = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const deleteUserProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;

  try {
    // Remove product from Product collection
    await Product.findByIdAndDelete(productId);

    // Remove product from User collection
    const user = await User.findById(userId).populate("products");
    /*user.products.pull(productId);
		const userWithoutProduct=await user.save();*/
    res.status(200).json({ products: user.products });
  } catch (error) {
    res.status(500).json({ msg: "failed" });
  }
};

const getProductsOfCompany = async (req, res) => {
  //myposts
  try {
    const productUser = await Product.find({
      user: { $eq: req.user._id.toString() },
    });
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
      res
        .status(300)
        .json({ msg: "this company does not have any products yet" });
    }
  } catch (error) {
    res.status(500).json({ msg: "get  product of company is failed" });
  }
};
const handleShowProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    const update = product.show ? false : true;
    const updatedProduct = { ...product._doc, show: update };
    const doc = await Product.findOneAndUpdate({ _id: id }, updatedProduct, {
      new: true,
    });
    const products = await Product.find({ user: { $eq: req.user._id } });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ msg: "show  product is failed" });
  }
};

module.exports = {
  getProduct,
  createProduct,
  modifyProduct,
  getProductsOfCompany,
  getProductsOfSpeceficCompany,
  handleShowProduct,
  deleteUserProduct,
  getPro,
};
