const TeamContoller = require('../controllers/TeamController');
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorHandler');

const router = require('express').Router();

router.post('/', UserController.createUser)
router.post('/login', UserController.userLogin)


router.use(authentication)
router.get('/teams', TeamContoller.getTeams)
router.post('/teams', TeamContoller.createTeam)



router.use(errorHandler)
module.exports = router;