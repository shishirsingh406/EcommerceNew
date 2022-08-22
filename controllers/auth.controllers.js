const USER = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

exports.signUp = async (req, res) => {
  /**
   * read all the value from body
   */

  try {
    /**
     * check user enter data  or not
     */
    if (!req.body) {
      return res.status(400).send({
        message: 'please add all require field',
      });
    }
    /**
     * check phone number
     * phone number must be 10 digit
     * and phone number must be number
     */
    // console.log(typeof req.body.contactNumber);
    if (
      `${req.body.contactNumber}`.length !== 10 ||
      isNaN(req.body.contactNumber)
    ) {
      return res.status(400).send({
        message: 'Invalid contact number!',
      });
    }
    // console.log(req.body.email);
    let particularUser = {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      contactNumber: req?.body?.contactNumber,
      email: req?.body?.email,
      userName: req?.body?.userName,
      password: bcrypt.hashSync(req?.body?.password, 8),
    };
    const savedUser = await USER.create(particularUser);

    let userResponse = {
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      _id: savedUser._id,
    };
    res.status(200).send(userResponse);
  } catch (e) {
    // console.log(e.keyValue.contactNumber);
    // console.log(e.keyValue.email);
    if (e.keyValue?.email && e.code === 11000) {
      return res.status(500).send({
        mesage: `Try any other email, this email is already registered!`,
      });
    }
    res.status(500).send({
      mesage: `${e}`,
    });
  }
};

/**
 * signin for a user
 * post request
 * generate jwt token
 * validate user before login
 */
exports.signin = async (req, res) => {
  /**
   * generate jwt token
   */
  try {
    const userSaved = await USER.findOne({ email: req.body.email });
    const token = jwt.sign({ id: userSaved.userName }, authConfig.SECRET_KEY, {
      expiresIn: 600,
    });
    let responseObject = {
      email: userSaved.email,
      name: `${userSaved.firstName} ${userSaved.lastName}`,
      isAuthenticated: true,
      accessToken: token,
    };
    res.status(200).send(responseObject);
  } catch (e) {
    res.status(500).send({
      mesage: `internal server  error ${e}`,
    });
  }
};
