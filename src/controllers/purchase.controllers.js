const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Cart = require('../models/Cart');

const getAll = catchError(async (req, res) => {
    const userId = req.user.id
    const result = await Purchase.findAll({where: {userId},
    
        include:[{
            model: Product,
            attributes: { exclude: ['createAt', 'updateAt']},
            include: [{
                model: Category,
                attributes: ['name', 'id']
            }]
        }]
    })
        
    return res.status(200).json(result);
});

const create = catchError(async(req, res) =>{
    const userId = req.user.id

    const cart = await Cart.findAll({
        where: {userId},
        raw: true,
        attributes: ['quantity', 'userId', 'productId']
    })

    if(!cart) return res.sendStatus(404)

        const result = await Purchase.bulkCreate(cart)

        await Cart.destroy({where: {userId}})
        return res.status(201).json(result)
})

module.exports = {
    getAll,
    create
};