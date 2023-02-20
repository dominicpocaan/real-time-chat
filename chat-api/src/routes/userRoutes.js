const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const { errorHandlerWrapper } = require('../middlewares/errorHandler');

router.get('', errorHandlerWrapper(userController.get));
router.get('/list', errorHandlerWrapper(userController.getAll));

module.exports = router;
