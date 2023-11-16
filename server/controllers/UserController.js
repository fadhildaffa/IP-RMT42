const { comparePassword } = require('../helper/bcrypt');
const { signToken } = require('../helper/jwt');
const { User } = require('../models')

class UserController {

    static async createUser(req, res, next) {
        try {
            const { name, email, password } = req.body;

            const userCreate = await User.create({ name, email, password })
            res.status(201).json({
                id: userCreate.id,
                email: userCreate.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async userLogin(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) throw ({ name: "NullEmail" })
            if (!password) throw ({ name: "NullPassword" })

            const user = await User.findOne({ where: { email } })

            if (!user) throw ({ name: "ErrorEmailorPassword" })

            const isValidPassword = comparePassword(password, user.password)

            if (!isValidPassword) throw ({ name: "ErrorEmailorPassword" })

            const access_token = signToken({ id: user.id })
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }

    static async userLoginGoogle(req, res, next) {
        const { OAuth2Client } = require('google-auth-library');
        const client = new OAuth2Client();
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.g_token,
                audience: process.env.G_CLIENT
            });
            const payload = ticket.getPayload();

            const [user, isNewRecord] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    name: payload.name,
                    password: String(Math.random())
                }
            })
            const access_token = signToken({ id: user.id })
            res.status(isNewRecord ? 201 : 200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }

    static async updateRole (req, res, next){
        try {
            await req.user.update({role: "staff"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;