const app = require('../app');
const request = require('supertest');
const { Category, sequelize, Team, User } = require('../models');
const { signToken } = require('../helper/jwt');
const { hashPassword } = require('../helper/bcrypt');
let { queryInterface } = sequelize;
let tokenAdmin, tokenStaff, tokenVisitor;
let invalidToken = `eyJhbGciOiJIUzI1NiIsfsdffcCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkb255QGdtYWlsLmNvbSIsImlhdCI6MTY5ODg1MzIxMH0.rSu6Zw_gNqaviab42yLdwluBjk9yrrIycGpkTjFBXVk`;
let createdTeam, createdTeam3;

beforeAll(async () => {

    let user1 = await User.create({
        name: "Yoichi Isagi",
        email: "yoichi@striker.com",
        role: "admin",
        password: hashPassword("1234567"),
        createdAt: new Date(),
        updatedAt: new Date()
    });

    let user2 = await User.create({
        email: "user2@gmail.com",
        password: "1234567",
        role: "staff"
    });

    let user3 = await User.create({
        email: "user3@gmail.com",
        password: "1234567",
        role: "visitor"
    });

    tokenAdmin = signToken({ id: user1.id, email: user1.email });
    tokenStaff = signToken({ id: user2.id, email: user2.email });
    tokenVisitor = signToken({ id: user3.id, email: user3.email });


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
    createdTeam2 = await Team.create({
        name: "Kemenenangan City atas United",
        win: 11,
        logo: "https://cdns.klimg.com/bola.net/library/upload/21/2023/10/645x430/mount-dt-2_d01d5aa.jpg",
        draw: 10,
        lose: 10,
        clean_sheet: 10,
        goal_average: 10,
        failed_to_score: 10,
        authorId: user2.id,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    createdTeam3 = await Team.create({
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
    test("succes deleted team by id", async () => {
        let { status, body } = await request(app)
            .delete(`/teams/${createdTeam2.id}`)
            .set("Authorization", `Bearer ${tokenAdmin}`)

            expect(status).toBe(200);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(String));
            expect(body.message).toContain(`Team ${createdTeam.name} success deleted from list`);
    });

    test("Fail to delete team by id before login", async () => {
        let { status, body } = await request(app)
            .delete(`/teams/${createdTeam.id}`)

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Unauthenticated");
    });

    test("Fail to delete team by id wrong token", async () => {
        let { status, body } = await request(app)
            .delete(`/teams/${createdTeam.id}`)
            .set("Authorization", `Bearer ${invalidToken}`)

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Invalid JWT Token");
    });

    test("Fail to delete team not found id", async () => {
        let { status, body } = await request(app)
            .delete(`/teams/100`)
            .set("Authorization", `Bearer ${tokenAdmin}`)

            expect(status).toBe(404);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Data not found");
    });

    test("Fail to delete team with no Authorization", async () => {
        let { status, body } = await request(app)
            .delete(`/teams/${createdTeam3.id}`)
            .set("Authorization", `Bearer ${tokenStaff}`)

        expect(status).toBe(403);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(Array));
        expect(body.message).toContain("You are not authorized");
    });

    test("Fail to delete team with no Authorization", async () => {
        let { status, body } = await request(app)
            .delete(`/teams/${createdTeam3.id}`)
            .set("Authorization", `Bearer ${tokenVisitor}`)

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