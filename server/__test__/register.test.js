const app = require('../app');
const request = require('supertest');
const {User, sequelize} = require('../models');
const {hashPassword} = require('../helper/bcrypt');
const {signToken} = require('../helper/jwt');
let {queryInterface} = sequelize;
let tokenAdmin;
let tokenStaff;
const seed_user1 = {
    email: "test@email.com",
    password: "password"
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

    test("failed add-user with no Email (400)", async () => {
        let {status, body} = await request(app)
            .post('/add-user')
            .send(user3)
            .set("Authorization", `Bearer ${tokenAdmin}`)

            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("email is required");
    });

    test("failed add-user with no Password (400)", async () => {
        let {status, body} = await request(app)
            .post('/add-user')
            .send(user4)
            .set("Authorization", `Bearer ${tokenAdmin}`)
            
            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("password is required");
    });

    test("failed add-user with Email input stringless (400)", async () => {
        let {status, body} = await request(app)
            .post('/add-user')
            .send(user5)
            .set("Authorization", `Bearer ${tokenAdmin}`)
            
            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("email is required", "must be an email");
    });

    test("failed add-user with Password input stringless (400)", async () => {
        let {status, body} = await request(app)
            .post('/add-user')
            .send(user6)
            .set("Authorization", `Bearer ${tokenAdmin}`)
            
            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("password is required", "password length must be at least 5 character");
    });

    test("failed add-user with wrong Email format (400)", async () => {
        let {status, body} = await request(app)
            .post('/add-user')
            .send(user7)
            .set("Authorization", `Bearer ${tokenAdmin}`)
            
            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("must be an email");
    });

    test("failed add-user with wrong Email format (400)", async () => {
        let {status, body} = await request(app)
            .post('/add-user')
            .send(user7)
            
            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Unauthenticated");
    });

    test("failed add-user cause no authentication (401)", async () => {
        let {status, body} = await request(app)
            .post('/add-user')
            .send(user7)
            
            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Unauthenticated");
    });

    test("failed add-user with wrong Token authentication (400)", async () => {
        let {status, body} = await request(app)
            .post('/add-user')
            .send(user7)
            .set("Authorization", `Bearer ${invalidToken}`)
            
            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Invalid JWT Token");
    });

    test("failed add-user strict to authorization (403)", async () => {
        let {status, body} = await request(app)
            .post('/add-user')
            .send(user7)
            .set("Authorization", `Bearer ${tokenStaff}`)
            
            expect(status).toBe(403);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("You are not authorized");
    });
});

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
});