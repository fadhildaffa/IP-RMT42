const app = require('../app');
const request = require('supertest');
const { sequelize, Team, User } = require('../models');
const { signToken } = require('../helper/jwt');
const { hashPassword } = require('../helper/bcrypt');
let { queryInterface } = sequelize;
let tokenAdmin, tokenStaff, tokenVisitor;
let invalidToken = `eyJhbGciOiJIUzI1NiIsfsdffcCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkb255QGdtYWlsLmNvbSIsImlhdCI6MTY5ODg1MzIxMH0.rSu6Zw_gNqaviab42yLdwluBjk9yrrIycGpkTjFBXVk`;
let createdTeam, createdTeam2;

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
        
})
let updateTeam = {
    name: "Kemenenangan City",
    win: 29,
    logo: "https://cdns.klimg.com/bola.net/library/upload/21/2023/10/645x430/mount-dt-2_d01d5aa.jpg",
    draw: 8,
    lose: 1,
    clean_sheet: 10,
    goal_average: 10,
    failed_to_score: 10,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
};

let updateTeam1 = {
    name: "Kemenenangan City",
    win: "",
    logo: "https://cdns.klimg.com/bola.net/library/upload/21/2023/10/645x430/mount-dt-2_d01d5aa.jpg",
    draw: "",
    lose: "",
    clean_sheet: "",
    goal_average: "",
    failed_to_score: "",
    authorId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
};

describe('/teams', () => {
    test("succes update detailed team by id", async () => {
        let { status, body } = await request(app)
            .put(`/teams/${createdTeam.id}`)
            .send(updateTeam)
            .set("Authorization", `Bearer ${tokenAdmin}`)

            expect(status).toBe(200);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("name", expect.any(String));
            expect(body).toHaveProperty("logo", expect.any(String));
            expect(body).toHaveProperty("win", expect.any(Number));
            expect(body).toHaveProperty("lose", expect.any(Number));
            expect(body).toHaveProperty("draw", expect.any(Number));
            expect(body).toHaveProperty("clean_sheet", expect.any(Number));
            expect(body).toHaveProperty("failed_to_score", expect.any(Number));
            expect(body).toHaveProperty("goal_average", expect.any(Number));
            expect(body).toHaveProperty("authorId", expect.any(Number));
    });

    test("Fail to update team by id before login", async () => {
        let { status, body } = await request(app)
            .put(`/teams/${createdTeam.id}`)
            .send(updateTeam)

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Unauthenticated");
    });

    test("Fail to update team by id wrong token", async () => {
        let { status, body } = await request(app)
            .put(`/teams/${createdTeam.id}`)
            .send(updateTeam)
            .set("Authorization", `Bearer ${invalidToken}`)

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Invalid JWT Token");
    });

    test("Fail to update team not found id", async () => {
        let { status, body } = await request(app)
            .put(`/teams/100`)
            .send(updateTeam)
            .set("Authorization", `Bearer ${tokenAdmin}`)

            expect(status).toBe(404);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Data not found");
    });

    test("Fail to update team with no Authorization", async () => {
        let { status, body } = await request(app)
            .put(`/teams/${createdTeam.id}`)
            .send(updateTeam)
            .set("Authorization", `Bearer ${tokenStaff}`)

            expect(status).toBe(403);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("You are not authorized");
    });

    test("Fail to update team with no Authorization", async () => {
        let { status, body } = await request(app)
            .put(`/teams/${createdTeam.id}`)
            .send(updateTeam)
            .set("Authorization", `Bearer ${tokenVisitor}`)

            expect(status).toBe(403);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("You are not authorized");
    });

    test("Fail to update team with bad request", async () => {
        let { status, body } = await request(app)
            .put(`/teams/${createdTeam.id}`)
            .send(updateTeam1)
            .set("Authorization", `Bearer ${tokenAdmin}`)
        
            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(Array));
            expect(body.message).toContain("Win is required", "Win must be a number", "Draw is required", "Draw must be a number", "Lose is required", "Lose must be a number", "Clean Sheet is required", "Clean Sheet must be a number", "Average Goal is required", "Average Goal must be a number");
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