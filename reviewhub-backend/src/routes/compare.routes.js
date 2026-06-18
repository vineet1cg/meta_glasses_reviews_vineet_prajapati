const { Router } = require('express');
const reviewController = require('../controllers/review.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = Router();

router.use(authenticate);

router.get('/', reviewController.compareUsers);
router.get('/rating', reviewController.compareRatings);

module.exports = router;
