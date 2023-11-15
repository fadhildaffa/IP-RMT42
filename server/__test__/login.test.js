const app = require('../app');
const request = require('supertest');
const { sequelize } = require('../models')
let { queryInterface } = sequelize;
const {hashPassword} = require('../helper/bcrypt');

beforeAll(async () => {
    await queryInterface.bulkInsert("Users", [{
        name: "Yoichi Isagi",
        email: "yoichi@striker.com",
        role: "admin",
        password: hashPassword("1234567"),
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
})
const user1 = {
    email: "yoichi@striker.com",
    password: "1234567"
}

const user2 = {
    email: "",
    password: "1234567"

}

const user3 = {
    email: "yoichi@striker.com",
    password: ""
}

const user4 = {
    email: "dony@gmail.c",
    password: "1234567"
}
const user5 = {
    email: "dony@gmail.com",
    password: "123467"
}
describe('/login', () => {
    test("succes login with registered data", async () => {
        let { status, body } = await request(app)
            .post('/login')
            .send(user1)

            
            expect(status).toBe(200);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("access_token", expect.any(String));
    });

    test("failed login with no Email (400)", async () => {
        let { status, body } = await request(app)
            .post('/login')
            .send(user2)

            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Email is missing");
    });

    test("failed login with no Password (400)", async () => {
        let { status, body } = await request(app)
            .post('/login')
            .send(user3)

            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Password is missing");
    });

    test("failed login with invalid email (401)", async () => {
        let { status, body } = await request(app)
            .post('/login')
            .send(user4)

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Invalid email/password");
    });

    test("failed login with invalid password (401)", async () => {
        let { status, body } = await request(app)
            .post('/login')
            .send(user5)

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Invalid email/password");
    });
});

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
});