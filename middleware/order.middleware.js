const PRODUCT = require('../models/product.model');
const ADDRESS = require('../models/address.model');

const isValidOrder = async (req, res, next) => {
  try {
    let product = await PRODUCT.findOne({ _id: req.body.productId });
    if (!product) {
      return res.status().send({
        message: `No Product found for ID - ${req.body.productId}!`,
      });
    }

    let address = await ADDRESS.findOne({ _id: req.body.addressId });
    if (!address) {
      return res.status().send({
        message: `No Product found for ID - ${req.body.addressId}!`,
      });
    }
    req.product = product;
    req.address = address;
    next();
  } catch (e) {
    res.status(500).send({
      message: 'something went wrong ',
    });
  }
};
module.exports = { isValidOrder };
