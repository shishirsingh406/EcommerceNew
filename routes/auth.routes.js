const authController = require('../controllers/auth.controllers');
const { validateUser } = require('../middleware/auth.middleware');

module.exports = (app) => {
  console.log('hello app');

  app.post('/ecommerce/api/v1/auth/signup', authController.signUp);
  app.post(
    '/ecommerce/api/v1/auth/login',
    [validateUser],
    authController.signin
  );
};
