const { User, Team } = require('../models');
const cloudinary = require('cloudinary').v2;
const { randomUUID } = require('crypto');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

class TeamController {

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
            const team = await Team.create({name, win, draw, lose, logo, clean_sheet, goal_average, failed_to_score, authorId: req.user.id});
            res.status(201).json(team)
        } catch (error) {
            next(error)
        }
    }

    static async findOne(req, res, next){
        try {
            const { id } = req.params; 
            const team = await Team.findByPk(id);
            if(!team) throw ({name: "NotFound"})
            res.status(200).json(team)
        } catch (error) {
            next(error)
        }
    }

    static async deleteTeam(req, res, next){
        try {
            const { id } = req.params; 
            const team = await Team.findByPk(id);
            if(!team) throw ({name: "NotFound"});
            await team.destroy();
            res.status(200).json({message: `Team ${team.name} success deleted from list`})
        } catch (error) {
            next(error)
        }
    }

    static async updateTeam(req, res, next){
        try {
            const { id } = req.params; 
            const {name, win, draw, lose, logo, clean_sheet, goal_average, failed_to_score} = req.body;
            const team = await Team.findByPk(id);
            if(!team) throw ({name: "NotFound"});
            await team.update({name, win, draw, lose, logo, clean_sheet, goal_average, failed_to_score});
            res.status(200).json(team)
        } catch (error) {
            next(error)
        }
    }


}

module.exports = TeamController;