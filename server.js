const express = require('express');
const app = express();
const { PORT } = require('./config/APP.config');
const { DB_URL } = require('./config/db.config');
const mongoose = require('mongoose');
const user = require('./models/user.models');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const PRODUCT = require('./models/product.model');

/**
 * plug in middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * connect backend application to server
 * @PORT  connect server to PORT number 7070
 */
/**
 * connect nodeja aap
 * to mongodb
 */
mongoose.connect(DB_URL);
const db = mongoose.connection;

const initApp = async () => {
  try {
    let adminUser = await user.find({});
    // console.log(adminUser);
    if (adminUser.length === 0) {
      let defaultUser = {
        firstName: 'upgrade',
        lastName: 'shope',
        contactNumber: 12345677166,
        email: 'admin@upgrad.com',
        userName: 'admin',
        role: 'ADMIN',

        password: bcrypt.hashSync('password', 8),
      };
      let savedUser = await user.create(defaultUser);
      if (savedUser) {
        let defaultProduct = {
          name: 'automotive product',
          category: 'electronics',
          price: 1000,
          description: 'This is a cool automotive product',
          manufacturer: 'Automotive manufacturer',
          availableItems: 20,
          imageUrl: 'image url',
          createdBy: savedUser._id,
        };
        const savedProduct = await PRODUCT.create(defaultProduct);

        console.log(savedProduct);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
db.on('error', () => {
  console.log('something went wrong while connection to db');
});
db.once('open', () => {
  console.log(`connected to database successfully ${DB_URL}`);
  initApp();
});

/**
 * plug all routes here
 */
require('./routes/auth.routes')(app);
require('./routes/address.routes')(app);
require('./routes/product.routes')(app);
require('./routes/order.routes')(app);
app.listen(PORT, () => {
  console.log(
    `application connected to server successfully at port number ${PORT}`
  );
});
