const app = require('../app');
const request = require('supertest');
const {Category, sequelize, User} = require('../models');
const {signToken} = require('../helper/jwt');
const {hashPassword} = require('../helper/bcrypt');
let {queryInterface} = sequelize;
let userAdmin;
let token;
let visitor;
let visitorToken;

let seed_post = {
    name: "Kemenenangan City atas United",
    win: 11,
    logo: "https://cdns.klimg.com/bola.net/library/upload/21/2023/10/645x430/mount-dt-2_d01d5aa.jpg",
    draw: 10,
    lose: 10,
    clean_sheet: 10,
    goal_average: 10,
    failed_to_score: 10,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
}
beforeAll(async () => {
    userAdmin = await User.create({
        name: "Yoichi Isagi",
        email: "yoichi@striker.com",
        role: "admin",
        password: hashPassword("1234567"),
        createdAt: new Date(),
        updatedAt: new Date()
    });

    visitor = await User.create({
        name: "Yoichi Isagi",
        email: "sea@play.com",
        role: "visitor",
        password: hashPassword("1234567"),
        createdAt: new Date(),
        updatedAt: new Date()
    });
    token = signToken({id: userAdmin.id, email: userAdmin.email});
    visitorToken = signToken({id: visitor.id, email: visitor.email});
    
})

let invalidToken = `eyJhbGciOiJIUzI1NiIsfsdffcCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkb255QGdtYWlsLmNvbSIsImlhdCI6MTY5ODg1MzIxMH0.rSu6Zw_gNqaviab42yLdwluBjk9yrrIycGpkTjFBXVk`;


let seed_post1 = {
    name: "",
    win: "",
    logo: "https://cdns.klimg.com/bola.net/library/upload/21/2023/10/645x430/mount-dt-2_d01d5aa.jpg",
    draw: "",
    lose: "",
    clean_sheet: "",
    goal_average: "",
    failed_to_score: "",
    authorId: "",
    createdAt: new Date(),
    updatedAt: new Date()
}




describe('/teams', () => {
    test("succes create team", async () => {
        let {status, body} = await request(app)
            .post('/teams')
            .send(seed_post)
            .set("Authorization", `Bearer ${token}`)

            expect(status).toBe(201);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("name", "win", "logo", "draw", "lose", "clean_sheet", "goal_average", "failed_to_score");
    });

    test("Fail to create team before login", async () => {
        let {status, body} = await request(app)
            .post('/teams')
            .send(seed_post)
            
            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Unauthenticated");
    });

    test("Fail to create team wrong token", async () => {
        let {status, body} = await request(app)
            .post('/teams')
            .send(seed_post)
            .set("Authorization", `Bearer ${invalidToken}`)

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Invalid JWT Token");
    });

    test("Fail to create team cause required requirement", async () => {
        let {status, body} = await request(app)
            .post('/teams')
            .send(seed_post1)
            .set("Authorization", `Bearer ${token}`)

            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Name is required", "Win is required", "Draw is required", "Author Id is required", "Lose is required", "Clean Sheet is required");
    });

    test("Fail to create team cause forbidden", async () => {
        let {status, body} = await request(app)
            .post('/teams')
            .send(seed_post1)
            .set("Authorization", `Bearer ${visitorToken}`)

            expect(status).toBe(403);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("You are not authorized");
    });

})

afterAll(async () => {
    await queryInterface.bulkDelete('Teams', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    });

    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
});