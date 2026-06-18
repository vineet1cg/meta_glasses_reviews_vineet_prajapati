const { Router } = require('express');
const reviewController = require('../controllers/review.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = Router();

router.use(authenticate);

router.get('/:country/reviews', (req, res, next) => {
  req.query.country = req.params.country;
  reviewController.getAllReviews(req, res, next);
});

module.exports = router;
