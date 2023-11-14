const app = require('../app');
const request = require('supertest');
const { sequelize, Team, User } = require('../models');
const { signToken } = require('../helper/jwt');
const { hashPassword } = require('../helper/bcrypt');
let { queryInterface } = sequelize;
let token;
let invalidToken = `eyJhbGciOiJIUzI1NiIsfsdffcCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkb255QGdtYWlsLmNvbSIsImlhdCI6MTY5ODg1MzIxMH0.rSu6Zw_gNqaviab42yLdwluBjk9yrrIycGpkTjFBXVk`;
let createdTeam;
beforeAll(async () => {
    let user1 = await User.create({
        name: "Yoichi Isagi",
        email: "yoichi@striker.com",
        role: "admin",
        password: hashPassword("1234567"),
        createdAt: new Date(),
        updatedAt: new Date()
    });

    token = signToken({ id: user1.id, email: user1.email });



    createdTeam = await Team.create({
        name: "Kemenenangan City atas United",
        win: 11,
        logo: "https://cdns.klimg.com/bola.net/library/upload/21/2023/10/645x430/mount-dt-2_d01d5aa.jpg",
        draw: 10,
        lose: 10,
        clean_sheet: 10,
        goal_average: 10,
        failed_to_score: 10,
        authorId: user1.id,
        createdAt: new Date(),
        updatedAt: new Date()
    });

})

describe('/teams', () => {
    test("succes request detailed  by id", async () => {
        let { status, body } = await request(app)
            .get(`/teams/${createdTeam.id}`)
            .set("Authorization", `Bearer ${token}`)

            expect(status).toBe(200);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("win", expect.any(Number));
            expect(body).toHaveProperty("logo", expect.any(String));
            expect(body).toHaveProperty("draw", expect.any(Number));
            expect(body).toHaveProperty("lose", expect.any(Number));
            expect(body).toHaveProperty("clean_sheet", expect.any(Number));
            expect(body).toHaveProperty("goal_average", expect.any(Number));
            expect(body).toHaveProperty("failed_to_score", expect.any(Number));
            expect(body).toHaveProperty("authorId", expect.any(Number));
    });

    test("Fail to request post by id before login", async () => {
        let { status, body } = await request(app)
            .get(`/teams/${createdTeam.id}`)

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(Array));
        expect(body.message).toContain("Unauthenticated");
    });

    test("Fail to request post by id wrong token", async () => {
        let { status, body } = await request(app)
            .get(`/teams/${createdTeam.id}`)
            .set("Authorization", `Bearer ${invalidToken}`)

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(Array));
        expect(body.message).toContain("Invalid JWT Token");
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