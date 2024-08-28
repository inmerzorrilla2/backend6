const { getAll, create, getOne, remove, update } = require('../controllers/productimg.controllers');
const express = require('express');
const upload = require('../utils/multer.js')


const routerProductImg = express.Router();

routerProductImg.route('/')
    .get(getAll)
    .post(upload.single('image'), create)

routerProductImg.route('/:id')
    .delete(remove)

    
    

module.exports = routerProductImg;