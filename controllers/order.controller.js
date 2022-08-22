/**
 * only user  is allow to order item
 * show will create middleware to check
 * user is not admin
 * and also user have to login
 */
const USER = require('../models/user.models');
const TICKET = require('../models/order.model');
exports.addItem = async (req, res) => {
  try {
    let product = req.product;
    let address = req.address;
    let quantity = req.body.quantity;
    let user = await USER.findOne({ userName: req.userName });
    console.log(address);
    let orderObject = {
      addressId: address._id,
      productId: product._id,
      quantity: quantity,
      userId: user._id,
    };
    let newOrder = await TICKET.create(orderObject);
    if (newOrder) {
      user.orderList.push(newOrder._id);
      await user.save();
    }
    // console.log(newOrder);
    res.status(200).send({
      addressId: newOrder.addressId,
      productId: newOrder.productId,
      quantity: newOrder.quantity,
    });
  } catch (e) {
    res.status(500).send({
      message: 'something went wrong ',
    });
  }
};
