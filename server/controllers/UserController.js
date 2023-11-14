const { comparePassword } = require('../helper/bcrypt');
const { signToken } = require('../helper/jwt');
const { User } = require('../models')

class UserController {

    static async createUser(req, res, next) {
        try {
            const {email, password} = req.body;
            
            if(!email) throw ({name:"NullEmail"})
            if(!password) throw ({name:"NullPassword"})

            const userCreate = await User.createUser({email, password})
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
            const {email, password} = req.body
            if(!email) throw ({name:"NullEmail"})
            if(!password) throw ({name:"NullPassword"})

            const user = await User.findOne({where: {email}})

            if(!user) throw({name:"ErrorEmailorPassword"})
            
            const isValidPassword = comparePassword(password, user.password)

            if(!isValidPassword) throw ({name: "ErrorEmailorPassword"})

            const access_token = signToken({id: user.id})
            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;