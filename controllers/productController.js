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
      const foundProduct = products.find((elt) => elt._id == id);
      res.status(400).json({ products: foundProduct });
    } else {
      res.status(200).json({ products });
    }
  } catch (error) {
    res.status(500).json({ msg: "operationof gettAllPersons is failed" });
  }
};

const createProduct = async (req, res) => {
  const product = req.body;

  /*   headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  } */
  try {
    const newProduct = await new Product({
      nameProduct: product.nameProduct,
      price: product.price,
      unitType: product.unitType,
      quantity: product.quantity,
      SelectedFile: req.file.filename,
    });
    const newP = await newProduct.save();
    res.status(200).json({ id: newP._id });
  } catch (error) {
    res.status(500).json({ msg: "failed" });
  }
};



const updateProduct = () => {};
const deleteProduct = () => {};
const getMyProducts = () => {};

module.exports = { getProduct, createProduct };
