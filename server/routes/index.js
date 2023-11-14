const UserController = require('../controllers/UserController');
const errorHandler = require('../middlewares/errorHandler');

const router = require('express').Router();

router.get('/', UserController.createUser)
router.post('/login', UserController.userLogin)



router.use(errorHandler)
module.exports = router;