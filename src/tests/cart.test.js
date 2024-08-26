require('../models')
const request = require("supertest")
const app = require('../app')
const Producto = require('../models/Product')
const Category = require('../models/Category')


const BASE_URL = '/api/v1/carts'
const BASE_URL_LOGIN  = '/api/v1/users/login'

let TOKEN; 
let userId="";
let cartId

let producTest
let Categories

const cart = {
    quantity: 1, 
    productId: 1,
    userId: 1
}

const newObjeto = {
    title: "HP Laptop all one portatil",
    description: "bien chingona",
    price: 20500,
    categoryId: 1
}



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
    console.log("este es el ID",userId)
    
})



const categor = {
    name: "Jeans"
  }


test("POST",async()=>{

   Categories = await Category.create(categor)
   producTest = await Producto.create(newObjeto)
  const res = await request(app)
  
  .post(BASE_URL)
  .send(cart)
  .set('authorization', `Bearer ${TOKEN}`)
   
  cartId = res.body.id
 
  expect(res.statusCode).toBe(201)
  expect(res.body.userId).toBe(userId)
  //expect(res.body.productId).toBe(producTest.id)
  expect(res.body).toBeDefined()
  
})
test("GET => 'BASE_URL', should return statusCode 200, and res.body.length", async() =>{
    const res = await request(app)
        .get(BASE_URL)
        .set('authorization', `Bearer ${TOKEN}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
          
})

test("GET => BASE_URL/:id, should return statusCode 200, and res.body.id === userId, res.body.product.id === producTest.id ", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${cartId}`)
        .set('authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.id).toBe(cartId)
    expect(res.body.userId).toBe(userId)
    // expect(res.body.product.id).toBe(producTest.id)
    //expect(res.body.product.title).toBe(producTest.title)

})

test("PUT => BASE_URL/:id, should returng statusCode 200", async()=>{
    const cartUpdate = {
        quantity: 50
    }
    const res = await request(app)
    .put(`${BASE_URL}/${cartId}`)
    .send(cartUpdate)
    .set('authorization', `Bearer ${TOKEN}`)
    console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cartUpdate.quantity)
   
})

test("DELETE => 'BASE_URL/:id', should return statusCode 204", async() => {
    const res = await request(app)
    .delete(`${BASE_URL}/${cartId}`)
    .set('authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)

    await producTest.destroy()
    await Categories.destroy()
   
})













