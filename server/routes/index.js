const TeamController = require('../controllers/TeamController');
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');
const {authorizationAdd, authorizationEditDelete} = require('../middlewares/authorization');
const errorHandler = require('../middlewares/errorHandler');

const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});

router.post('/register', UserController.createUser)
router.post('/login', UserController.userLogin)


router.use(authentication)
router.get('/teams', TeamController.getTeams)
router.post('/teams', authorizationAdd,TeamController.createTeam)
router.get('/teams/:id', TeamController.findOne)
router.delete('/teams/:id', authorizationEditDelete, TeamController.deleteTeam)
router.put('/teams/:id', authorizationEditDelete, TeamController.updateTeam)
router.patch('/teams/:id/logo', authorizationEditDelete, upload.single('logo'),TeamController.updateLogo)



router.use(errorHandler);

module.exports = router;