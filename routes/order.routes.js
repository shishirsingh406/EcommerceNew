const orderController = require('../controllers/order.controller');
const { isAuthanticate, isUser } = require('../middleware/auth.middleware');
const { isValidOrder } = require('../middleware/order.middleware');

module.exports = (app) => {
  app.post(
    '/ecommerce/api/v1/orders',
    [isAuthanticate, isUser, isValidOrder],
    orderController.addItem
  );
};
