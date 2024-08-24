const express = require('express');
const routerUser = require('./user.router');
const routerCategorie = require('./category.router');
const routerProduct = require('./product.router');
const routerCart = require('./cart.router');
const { verifyJWT } = require('../utils/verifyJWT');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser )
router.use('/categories', routerCategorie)
router.use('/products', routerProduct)
router.use('/carts', verifyJWT, routerCart)


module.exports = router;