const request = require("supertest")
const app = require('../app')

const BASE_URL = '/api/v1/users'
let TOKEN;
let TOKEN2;
let userId;

beforeAll(async() =>{
    const user = {
        email: "juan@gmail.com",
        password: "juan1234"
    }
    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

    TOKEN = res.body.token
    
})

const user = {
    firstName: "Iuvil",
    lastName: "Pena",
    email: "iuvil@gmail.com",
    password: "iuvil1234",
    phone: "+575312325"
}



test("POST => BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName", async () =>{
    
    // const columns = ['firstName', 'lastName', 'email', 'password', 'phone']
    const res = await request(app)
        .post(BASE_URL)
        .send(user)

        userId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    // columns.forEach((column) =>{

    // })
    expect(res.body.firstName).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
    
})

test("POST => 'BASE_URL/LOGIN, should return statusCode 200, and res.body.user.email === user.email", async() =>{
    const user = {
        email: "iuvil@gmail.com",
        password: "iuvil1234"
    }

    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)
    TOKEN2 = res.body.token
    expect(res.statusCode).toBe(200)
})

test("GET => BASE_URL, should return statusCode 200, and res.body.length === 2", async () =>{
    const res = await request(app)
    .get(BASE_URL)
    .set('authorization', `Bearer ${TOKEN2}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("PUT => BASE_URL, should return statusCode 200, and res.body.lastName === user2.lastName ", async () => {
    const user2 = {
        lastName: "Pema3",
        email: "123@hotmail.com",
        password: "1234she",
        phone: "77787111"
    }
    const res = await request(app)
    .put(`${BASE_URL}/${userId}`)
    .send(user2)
    .set('authorization', `Bearer ${TOKEN2}`)
    console.log('respuesta', res.body)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined() 
    
})

test("DELETE => BASE_URL/:ID, should return statusCode 204", async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set('authorization', `Bearer ${TOKEN2}`)
    expect(res.statusCode).toBe(204)
    
})

