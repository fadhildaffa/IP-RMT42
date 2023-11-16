const OpenAi = require('../controllers/OpenAi');
const PaymentGate = require('../controllers/PaymentGate');
const TeamController = require('../controllers/TeamController');
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');
const {authorizationAdd, authorizationEditDelete} = require('../middlewares/authorization');
const errorHandler = require('../middlewares/errorHandler');

const router = require('express').Router();


router.post('/register', UserController.createUser)
router.post('/login', UserController.userLogin)
router.post('/login/google', UserController.userLoginGoogle)


router.use(authentication)
router.get('/teams', TeamController.getTeams)
router.post('/teams', authorizationAdd,TeamController.createTeam)
router.get('/payment/midtrans',  PaymentGate.getMidtransToken)
router.get('/teams/ai', OpenAi.streamAi)
router.get('/teams/:id', TeamController.findOne)
router.delete('/teams/:id', authorizationEditDelete, TeamController.deleteTeam)
router.put('/teams/:id', authorizationEditDelete, TeamController.updateTeam)
router.patch('/users/role',  UserController.updateRole)




router.use(errorHandler);

module.exports = router;