const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { validateLogin } = require('../validators/auth.validator');
const { sendSuccess } = require('../utils/apiResponse');

const router = Router();

// POST /jwt/generate-token (same as login)
router.post('/generate-token', validate(validateLogin), authController.login);

// POST /jwt/verify-token
router.post('/verify-token', authenticate, (req, res) => {
  return sendSuccess(res, 'Token verified successfully', { user: req.user });
});

// POST /jwt/refresh-token
router.post('/refresh-token', authenticate, authController.refreshToken);

// GET /jwt/profile
router.get('/profile', authenticate, authController.getMe);

// GET /jwt/dashboard
router.get('/dashboard', authenticate, (req, res) => {
  return sendSuccess(res, 'JWT Dashboard access granted', { user: req.user });
});

// GET /jwt/admin
router.get('/admin', authenticate, authorize('admin'), (req, res) => {
  return sendSuccess(res, 'Admin access granted');
});

// GET /jwt/user
router.get('/user', authenticate, (req, res) => {
  return sendSuccess(res, 'User access granted', { user: req.user });
});

// DELETE /jwt/logout
router.delete('/logout', authenticate, authController.logout);

module.exports = router;
