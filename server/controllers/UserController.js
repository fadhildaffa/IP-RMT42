const { User } = require('../models')

class UserController {

    static async createUser(req, res, next) {
        try {
            const user  = await User.findAll()
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;