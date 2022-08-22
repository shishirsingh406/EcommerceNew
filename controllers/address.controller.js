/**
 * before doing address controller
 * we have to  complete isAuthanticate middleware
 */
const USER = require('../models/user.models');
const ADDRESS = require('../models/address.model');
exports.createAddress = async (req, res) => {
  try {
    /**
     * let's read the data from frontend
     *
     */
    const addressObject = {
      name: req?.body?.name,
      contactNumber: req?.body?.contactNumber,
      street: req?.body?.street,
      landmark: req?.body?.landmark,
      city: req?.body?.city,
      state: req?.body?.state,
      zipoCde: req?.body?.zipoCde,
    };
    /**
     * now let's gate userName from token
     */
    let userName = req.userName;
    /**
     * no let's find the user from database
     */
    const particularUser = await USER.findOne({ userName: userName });
    addressObject.user = particularUser._id;
    /**
     * now add address in database
     */
    const userAddress = await ADDRESS.create(addressObject);
    if (userAddress) {
      /**
       * now update user schema
       */
      particularUser.address.push(userAddress._id);
      await particularUser.save();
      res.status(200).send({
        userAddress,
        user: particularUser,
      });
    } else {
      res.status(500).send({
        mesage: `internal server  error `,
      });
    }
  } catch (e) {
    res.status(500).send({
      mesage: `internal server  error ${e}`,
    });
  }
};
