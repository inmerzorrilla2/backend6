// Relationships (many-to-many and one-to-many) => normalizations DB

const User = require("./User")
const Product = require("./Product")
const Category = require("./Category")
const Cart = require("./Cart")
const Purchase = require("./Purchase")
const ProductImg = require("./ProductImg")

// Product => categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

// Cart => userId
Cart.belongsTo(User)
User.hasMany(Cart)

// Cart => ProductId
Cart.belongsTo(Product)
Product.hasMany(Cart)

// Purchase => userId
Purchase.belongsTo(User)
User.hasMany(Purchase)

// Purchase => productId

Purchase.belongsTo(Product)
Product.hasMany(Purchase)

// ProductImg => Product
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)