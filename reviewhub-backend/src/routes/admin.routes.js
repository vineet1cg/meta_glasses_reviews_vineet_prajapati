const { Router } = require('express');
const adminController = require('../controllers/admin.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const router = Router();

// Protect all routes to admin only
router.use(authenticate);
router.use(authorize('admin'));

router.get('/users', adminController.getAllUsers);
router.put('/users/:id/role', adminController.updateUserRole);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
