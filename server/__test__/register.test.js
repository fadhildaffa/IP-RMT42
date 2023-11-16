const app = require('../app');
const request = require('supertest');
const {User, sequelize} = require('../models');
const {hashPassword} = require('../helper/bcrypt');
const {signToken} = require('../helper/jwt');
let {queryInterface} = sequelize;

const seed_user1 = {
    email: "yoichi@striker.com",
    password: "1234567"
}
beforeAll(async () => {
   let userAdmin = await User.create({
    name: "Yoichi Isagi",
    email: "yoichi@striker.com",
    role: "admin",
    password: hashPassword("1234567"),
    createdAt: new Date(),
    updatedAt: new Date()
  });
    
})


const user2 = {
    email: "test1@email.com",
    password: "password"
}

const user3 = {
    password: "password"
}

const user4 = {
    email: "test1@email.com",
}
const user5 = {
    email: "",
    password: "123123"
}
const user6 = {
    email: "test1@email.com",
    password: ""
}
const user7 = {
    email: "test1email.com",
    password: "123123"
}



describe('/register', () => {
    test("succes register new user", async () => {
        let {status, body} = await request(app)
            .post('/register')
            .send(user2)
            
            expect(status).toBe(201);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("email", "test1@email.com");
    });

    test("failed register with duplicate email (400)", async () => {
        let {status, body} = await request(app)
            .post('/register')
            .send(seed_user1)

            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("email must be unique");
    });

    test("failed register with no Email (400)", async () => {
        let {status, body} = await request(app)
            .post('/register')
            .send(user3)

            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Email is required");
    });

    test("failed register with no Password (400)", async () => {
        let {status, body} = await request(app)
            .post('/register')
            .send(user4)
            
            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Password is required");
    });

    test("failed register with Email input stringless (400)", async () => {
        let {status, body} = await request(app)
            .post('/register')
            .send(user5)
            
            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Email is required", "must be an email");
    });

    test("failed register with Password input stringless (400)", async () => {
        let {status, body} = await request(app)
            .post('/register')
            .send(user6)
            
            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Password is required");
    });

    test("failed register with wrong Email format (400)", async () => {
        let {status, body} = await request(app)
            .post('/register')
            .send(user7)
            
            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("must be an email");
    });

});

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
});