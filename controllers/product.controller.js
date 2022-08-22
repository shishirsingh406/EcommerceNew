const USER = require('../models/user.models');
const PRODUCT = require('../models/product.model');
const { uniqueObject } = require('../helper/uniqueObject');
/**
 *
 * check user is login or not
 * validate only authorized user allow to add product
 * here authorized user is admin
 * we have to create middleware to verify user is admin
 */

exports.addProduct = async (req, res) => {
  try {
    /**
     * check user enter data  or not
     */
    if (!req.body) {
      return res.status(400).send({
        message: 'please add all require field',
      });
    }
    let productObject = {
      name: req?.body?.name,
      category: req?.body?.category,
      price: req?.body?.price,
      description: req?.body?.description,
      manufacturer: req?.body?.manufacturer,
      availableItems: req?.body?.addProduct,
      imageUrl: req?.body?.imageUrl,
    };
    // createdBy: savedUser._id,
    let userObject = await USER.findOne({ userName: req.userName });
    productObject.createdBy = userObject._id;
    let savedProduct = await PRODUCT.create(productObject);
    /**
     * push the created product id to admin so everyone
     * know who created the ticket
     */
    userObject.createProduct.push(savedProduct._id);
    await userObject.save();
    res.status(200).send({
      _id: savedProduct._id,
      name: savedProduct.name,
      category: savedProduct.category,
      price: savedProduct.price,
      description: savedProduct.description,
      manufacturer: savedProduct.manufacturer,
      availableItems: savedProduct.availableItems,
      imageUrl: savedProduct.imageUrl,
      createdAt: savedProduct.createdAt,
      updatedAt: savedProduct.updatedAt,
    });
  } catch (e) {
    res.status(500).send({
      message: `something went wrong ${e}`,
    });
  }
};
exports.getProductCategories = async (req, res) => {
  try {
    let product = await PRODUCT.find({});
    if (!product) {
      res.status(200).send([]);
    }

    let productByCategories = uniqueObject(product);
    res.status(200).send(productByCategories);
  } catch (e) {
    res.status(500).send({
      message: `something went wrong ${e}`,
    });
  }
};
exports.getProductById = async (req, res) => {
  try {
    let prodectId = req.params.id;
    // console.log(req.params.id);
    let productData = await PRODUCT.findOne({ _id: prodectId });
    // console.log(userPersonalData);
    if (!productData) {
      res.status(404).send({
        message: `No Product found for ID - <${prodectId}>!`,
      });
    }
    res.status(200).send(productData);
  } catch (e) {
    res.status(500).send({
      message: `something went wrong ${e}`,
    });
  }
};
exports.updateProductById = async (req, res) => {
  try {
    let prodectId = req.params.id;
    // console.log(req.params.id);
    let productData = await PRODUCT.findOne({ _id: prodectId });
    // console.log(userPersonalData);
    if (!productData) {
      res.status(404).send({
        message: `No Product found for ID - <${prodectId}>!`,
      });
    }

    productData.name =
      req?.body?.name === undefined ? productData.name : req?.body?.name;
    productData.category =
      req?.body?.category === undefined
        ? productData.category
        : req?.body?.category;
    productData.price =
      req?.body?.price === undefined ? productData.price : req?.body?.price;
    productData.description =
      req?.body?.description === undefined
        ? productData.description
        : req?.body?.description;
    productData.manufacturer =
      req?.body?.manufacturer === undefined
        ? productData.manufacturer
        : req?.body?.manufacturer;
    productData.availableItems =
      req?.body?.addProduct === undefined
        ? productData.availableItems
        : req?.body?.addProduct;
    productData.imageUrl =
      req?.body?.imageUrl === undefined
        ? productData.imageUrl
        : req?.body?.imageUrl;

    /**
     * now update the admin id also
     * because every time product get updated not
     * same admin will update the product
     */
    let AdminUser = await USER.findOne({ userName: req.userName });

    productData.updatedBy = AdminUser._id;
    // console.log(productObject);
    let updatedProduct = await productData.save();
    /**
     * push the updated product id to admin so everyone
     * know who updated the ticket
     */
    AdminUser.updateProduct.push(updatedProduct._id);
    await AdminUser.save();

    res.status(200).send(updatedProduct);
  } catch (e) {
    res.status(500).send({
      message: `something went wrong ${e}`,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    // No Product found for ID - <id>!
    let productId = req.params.id;
    //get index of that id
    let product = await PRODUCT.findOne({ _id: productId });
    if (!product) {
      return res.status(200).send({
        message: `No Product found for ID - <${productId}>!`,
      });
    }
    let productResponse = await PRODUCT.deleteOne({ _id: productId });
    res.status(200).send({
      message: `Product with ID - <${productId}> deleted successfully!`,
    });
  } catch (e) {
    res.status(500).send({
      message: `something went wrong`,
    });
  }
};
exports.searchProduct = async (req, res) => {
  try {
    let queryObj = {};

    const productCategory = req.query.category;
    if (productCategory) {
      queryObj.category = productCategory;
    }
    const productName = req.query.name;
    // console.log(productName);
    if (productName) {
      queryObj.name = productName;
    }
    let sortBy = -1;
    if (req.query.direction) {
      if (req.query.direction === 'ASC') {
        sortBy = 1;
      } else {
        sortBy = -1;
      }
    } else {
      sortBy = -1;
    }
    let sortObject = {};
    if (req.query.sortBy) {
      sortObject[req.query.sortBy] = sortBy;
      let product = await PRODUCT.find(queryObj).sort(sortObject);
      res.status(200).send(product);
    } else {
      let product = await PRODUCT.find(queryObj);
      res.status(200).send(product);
    }

    // console.log(queryObj);
  } catch (e) {
    res.status(500).send({
      message: `something went wrong`,
    });
  }
};
