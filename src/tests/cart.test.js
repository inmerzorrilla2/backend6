require('../models')
const request = require("supertest")
const app = require('../app')
const supertest = require('supertest')

const BASE_URL = '/api/v1/carts'
const BASE_URL_LOGIN  = '/api/v1/users/login'

let TOKEN 
let userId
let productId


beforeAll(async() =>{
    const user = {
        email: "juan@gmail.com",
        password: "juan1234"
    }
    const res = await request(app)
    .post(BASE_URL_LOGIN)
    .send(user)
    TOKEN = res.body.token
})

const user = {
    quantity: 1, 
    productId: 1,
    userId: 1
}

// Create

test("POST => BASE_URL, should return statusCode 201, and res.body.firstname === user.firstName", async() =>{
    
    const res = await request(app)
    // console.log('create', res.body)
    .post(`${BASE_URL}/login`)
    .send(user)
    

    // expect(res.statusCode).toBe(201)
    // expect(res.body).toBeDfined()
    
})

// GetOne
test("GET => BASE_URL, should return statusCode 200, and res.body.length === 1", async() => {
    const res = await supertest(app)
    .get(BASE_URL)
    .set('authorization', `Bearer ${TOKEN}`)
})

// GetAll
test("GET => BASE_URL, should return statusCode 200, and res.body.firstName", async() =>{
    const res = await supertest(app)
    .get(BASE_URL)
    .set('authorization', `Bearer ${TOKEN}`)

})



// Put

test("PUT => 'BASE_URL/:Id', should return statusCode 200, and res.body.firstName === userUpdate.firstName", async() =>{

})

// Delete
test("DELETE => BASE_URL/:Id, should return statusCode 204,", async() => {
    const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set('authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
})










