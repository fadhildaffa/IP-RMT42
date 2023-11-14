const { User, Team } = require('../models')

class TeamContoller {

    static async getTeams(req, res, next){
        try {
            const teams = await Team.findAll();
            res.status(200).json(teams)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TeamContoller;