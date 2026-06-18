const { Router } = require('express');
const reviewController = require('../controllers/review.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = Router();

router.use(authenticate);

router.get('/', reviewController.getRatings);
router.get('/:rating', (req, res, next) => {
  req.query.rating = req.params.rating;
  reviewController.getAllReviews(req, res, next);
});

module.exports = router;
