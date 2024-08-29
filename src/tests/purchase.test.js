require('../models')
const request = require("supertest")
const app = require('../app');
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Category = require("../models/Category");



const BASE_URL = '/api/v1/purchase'
const BASE_URL_LOGIN = '/api/v1/users/login'

let userId;
let TOKEN;
let productos;
let Car;
let categoria;

beforeAll(async() =>{
    const user = {
        email: "juan@gmail.com",
        password: "juan1234"
    }
    const res = await request(app)
    .post(BASE_URL_LOGIN)
    .send(user)
    TOKEN = res.body.token;
    
    userId=res.body.user.id
    // console.log(res)
    
    
})

const car ={
    quantity: 1
}

const  product = {
    title: 'Jeans blue dama',
    description: 'lorem 20',
    price: 1234
    // categoryId: 1
    
  }

const category = {
    name: "jeans"
}

afterAll(async() =>{
    // await Car.destroy()
    await productos.destroy()
    await categoria.destroy()
})

test("POST => BASE_URL, should return statusCode 201, res.body.name === category.name", async() => {
    categoria = await Category.create(category)
    product.categoryId = categoria.id
    productos = await Product.create(product)
    car.productId = productos.id;
    car.userId = userId
    Car = await Cart.create(car)
    // console.log('esto es categoria', categoria)
    // console.log('esto es productos', productos)
    // console.log('esto es car', Car)
    

    const res = await request(app)
    
        .post(BASE_URL)
        .set('authorization', `Bearer ${TOKEN}`)
        expect(res.statusCode).toBe(201)
        expect(res.body).toBeDefined()
        expect(res.body[0].productId).toBe(productos.dataValues.id)

})

test("GET => BASE_URL, should return statusCode 200, and res.body.length === 1", async()=>{
    const res = await request(app)
        
        .get(BASE_URL)
        .set('authorization', `Bearer ${TOKEN}`)
      

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)

    
    await categoria.destroy()
    // await productos.destroy()
    await Car.destroy()
    


    
})