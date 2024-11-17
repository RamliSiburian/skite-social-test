export const rest = {
  auth: {
    login: 'user/sign-in',
    userInfo: 'user/info'
  },
  global: {},
  dashboard: {
    product: {
      getProducts: 'product',
      productcategories: 'product/categories',
      findProduct: 'product/:ID',
      createProduct: 'product',
      updateProduct: 'product/:ID',
      deleteProduct: 'product/:ID',
    },
    report: {
      productSold: 'product/report',
    }
  }
}
