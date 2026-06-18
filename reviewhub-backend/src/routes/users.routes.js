const { Router } = require('express');
const reviewController = require('../controllers/review.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = Router();

router.use(authenticate);

router.get('/', reviewController.getAllUsers);
router.get('/:name/reviews', (req, res, next) => {
  req.query.name = req.params.name;
  reviewController.getAllReviews(req, res, next);
});

module.exports = router;
