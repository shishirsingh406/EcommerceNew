const USER = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

const validateUser = async (req, res, next) => {
  try {
    let userData = await USER.findOne({ email: req.body.email });
    if (!userData) {
      return res.status(404).send({
        message: 'This email has not been registered!',
      });
    }
    let isUserValid = bcrypt.compareSync(req.body.password, userData.password);
    if (!isUserValid) {
      return res.status(401).send({
        message: 'Invalid Credentials!',
      });
    }
    next();
  } catch (e) {
    res.status(500).send({
      mesage: `internal server  error ${e}`,
    });
  }
};
const isAuthanticate = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status().send({
        message: 'No token provided',
      });
    }
    /**
     * now verify accesstoken
     */
    jwt.verify(token, authConfig.SECRET_KEY, (err, decode) => {
      if (err) {
        res.status(401).send({
          message: 'Please login first to access this endpoint!',
        });
      }
      /**
       * if token  is valid read
       * the userId from token
       * and set it to request object
       */
      req.userName = decode.id;
      next();
    });
  } catch (e) {
    res.status(500).send({
      message: 'something went wrong ',
    });
  }
};
const isAdmin = async (req, res, next) => {
  try {
    let userName = req.userName;
    let userData = await USER.findOne({ userName: userName });
    if (userData.role !== 'ADMIN') {
      res.status(403).send({
        message: 'You are not authorised to access this endpoint!',
      });
    }
    next();
  } catch (e) {
    res.status(500).send({
      message: 'something went wrong ',
    });
  }
};
const isUser = async (req, res, next) => {
  try {
    let userName = req.userName;
    let userData = await USER.findOne({ userName: userName });
    if (userData.role !== 'USER') {
      res.status(403).send({
        message: 'You are not authorised to access this endpoint!',
      });
    }
    next();
  } catch (e) {
    res.status(500).send({
      message: 'something went wrong ',
    });
  }
};
module.exports = { validateUser, isAuthanticate, isAdmin, isUser };
