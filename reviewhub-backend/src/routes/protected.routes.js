const { Router } = require('express');
const reviewController = require('../controllers/review.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { validateReview } = require('../validators/review.validator');

const router = Router();

router.use(authenticate);

router.get('/reviews', reviewController.getAllReviews);
router.post('/reviews', validate(validateReview), reviewController.createReview);
router.delete('/reviews/:id', reviewController.deleteReview);

module.exports = router;
