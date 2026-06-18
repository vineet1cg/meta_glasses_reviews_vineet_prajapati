const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { validateRegister, validateLogin } = require('../validators/auth.validator');

const router = Router();

router.post('/register', validate(validateRegister), authController.register);
router.post('/login', validate(validateLogin), authController.login);
router.post('/logout', authenticate, authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/refresh-token', authenticate, authController.refreshToken);
router.get('/me', authenticate, authController.getMe);
router.delete('/account', authenticate, authController.deleteAccount);

// Also support profile routes under auth scope
router.get('/profile', authenticate, authController.getMe);
router.patch('/profile', authenticate, authController.updateProfile);
router.put('/profile', authenticate, authController.updateProfile);

module.exports = router;
