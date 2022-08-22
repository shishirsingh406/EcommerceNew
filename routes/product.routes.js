const productController = require('../controllers/product.controller');
const { isAuthanticate, isAdmin } = require('../middleware/auth.middleware');

module.exports = (app) => {
  console.log('hello app');

  app.post(
    '/ecommerce/api/v1/products',
    [isAuthanticate, isAdmin],
    productController.addProduct
  );

  /**
   * product based on categories
   * /products/categories
   */
  app.get(
    '/ecommerce/api/v1/products/categories',
    productController.getProductCategories
  );
  /**
   * product based on id
   * /products/:id
   */
  app.get('/ecommerce/api/v1/products/:id', productController.getProductById);
  app.put(
    '/ecommerce/api/v1/products/:id',
    [isAuthanticate, isAdmin],
    productController.updateProductById
  );
  app.delete(
    '/ecommerce/api/v1/products/:id',
    [isAuthanticate, isAdmin],
    productController.deleteProduct
  );
  app.get('/ecommerce/api/v1/products', productController.searchProduct);
};

// { _id: 1 }   its assending order
//{_id:-1} its set in descending order
// db.collection("employees").find().sort(mysort)
