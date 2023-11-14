const { User, Team } = require('../models')

class TeamContoller {

    static async getTeams(req, res, next){
        try {
            const teams = await Team.findAll({
                include: {
                    model: User,
                    attributes: ["name"]
                }
            });
            res.status(200).json(teams)
        } catch (error) {
            next(error)
        }
    }

    static async createTeam(req, res, next){
        try {
            const {name, win, draw, lose, logo, clean_sheet, goal_average, failed_to_score} = req.body 
            const teams = await Team.create({name, win, draw, lose, logo, clean_sheet, goal_average, failed_to_score, authorId: req.user.id});
            res.status(201).json(teams)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = TeamContoller;