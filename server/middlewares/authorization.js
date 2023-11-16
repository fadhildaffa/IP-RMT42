const {Team} = require('../models')
async function authorizationAdd(req, res, next) {
    try {
        if (req.user.role === "visitor") throw ({ name: "Forbidden" })
        next()
    } catch (error) {
        next(error)
    }
}

async function authorizationEditDelete(req, res, next) {
    try {
        const {id} = req.params
        const team = await Team.findByPk(id);
        if(!team) throw ({name: "NotFound"})
        if(req.user.role === "visitor") throw ({name: "Forbidden"})
        if(req.user.role === "staff"){
            if(team.authorId !== req.user.id){
                throw ({name: "Forbidden"})
            }
        }
        next()
    } catch (error) {
        next(error)
    }
}




module.exports = {
    authorizationAdd,
    authorizationEditDelete
};