const { isValidAddress } = require('../middleware/address.middleware');
const { isAuthanticate } = require('../middleware/auth.middleware');
const addressController = require('../controllers/address.controller');

module.exports = (app) => {
  console.log('hello app');
  app.post(
    '/ecommerce/api/v1/address',
    [isAuthanticate, isValidAddress],
    addressController.createAddress
  );
};
