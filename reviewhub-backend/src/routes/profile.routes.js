const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = Router();

router.use(authenticate);

router.get('/', authController.getMe);
router.patch('/', authController.updateProfile);
router.put('/', authController.updateProfile);

module.exports = router;
