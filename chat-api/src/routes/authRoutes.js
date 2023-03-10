const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const { errorHandlerWrapper } = require('../middlewares/errorHandler');

router.post('/register', errorHandlerWrapper(authController.register));
router.post('/login', errorHandlerWrapper(authController.login));
router.get('/status', errorHandlerWrapper(authController.status));

module.exports = router;
