const { Router } = require('express');
const reviewController = require('../controllers/review.controller');
const reviewService = require('../services/review.service');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { validateReview } = require('../validators/review.validator');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const router = Router();

// HEAD /reviews
router.head('/', (req, res) => {
  res.status(200).end();
});

// HEAD /reviews/:id
router.head('/:id', async (req, res) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);
    if (!review) return res.status(404).end();
    return res.status(200).end();
  } catch (err) {
    res.status(500).end();
  }
});

// OPTIONS /reviews
router.options('/', (req, res) => {
  res.setHeader('Allow', 'GET, POST, OPTIONS, HEAD');
  res.status(200).end();
});

// OPTIONS /reviews/:id
router.options('/:id', (req, res) => {
  res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS, HEAD, PATCH');
  res.status(200).end();
});

// Basic CRUD
router.get('/', authenticate, reviewController.getAllReviews);
router.get('/positive', authenticate, (req, res, next) => {
  req.query.positive = 1;
  reviewController.getAllReviews(req, res, next);
});
router.get('/negative', authenticate, (req, res, next) => {
  req.query.positive = 0;
  reviewController.getAllReviews(req, res, next);
});
router.get('/helpful', authenticate, (req, res, next) => {
  req.query.hasHelpful = 'true';
  req.query.sortBy = 'helpful';
  req.query.order = 'desc';
  reviewController.getAllReviews(req, res, next);
});
router.get('/top/highest-rated', authenticate, (req, res, next) => {
  req.query.sortBy = 'rating';
  req.query.order = 'desc';
  reviewController.getAllReviews(req, res, next);
});
router.get('/top/lowest-rated', authenticate, (req, res, next) => {
  req.query.sortBy = 'rating';
  req.query.order = 'asc';
  reviewController.getAllReviews(req, res, next);
});
router.get('/random', authenticate, reviewController.getRandomReview);
router.get('/trending', authenticate, (req, res, next) => {
  req.query.sortBy = 'helpful_aug';
  req.query.order = 'desc';
  reviewController.getAllReviews(req, res, next);
});
router.get('/recent', authenticate, (req, res, next) => {
  req.query.sortBy = 'date';
  req.query.order = 'desc';
  reviewController.getAllReviews(req, res, next);
});
router.get('/latest', authenticate, (req, res, next) => {
  req.query.sortBy = 'createdAt';
  req.query.order = 'desc';
  reviewController.getAllReviews(req, res, next);
});
router.get('/ai-summary', authenticate, reviewController.getAISummary);
router.get('/sentiment-analysis', authenticate, reviewController.getSentimentAnalysis);

// Route parameters
router.get('/title/:title', authenticate, (req, res, next) => {
  req.query.title = req.params.title;
  reviewController.getAllReviews(req, res, next);
});
router.get('/date/:date', authenticate, (req, res, next) => {
  req.query.date = req.params.date;
  reviewController.getAllReviews(req, res, next);
});
router.get('/helpful/:count', authenticate, (req, res, next) => {
  req.query.minHelpful = req.params.count;
  reviewController.getAllReviews(req, res, next);
});
router.get('/positive/:status', authenticate, (req, res, next) => {
  req.query.positive = req.params.status;
  reviewController.getAllReviews(req, res, next);
});
router.get('/country/:country/rating/:rating', authenticate, (req, res, next) => {
  req.query.country = req.params.country;
  req.query.rating = req.params.rating;
  reviewController.getAllReviews(req, res, next);
});
router.get('/year/:year', authenticate, (req, res, next) => {
  req.query.year = req.params.year;
  reviewController.getAllReviews(req, res, next);
});
router.get('/month/:month', authenticate, (req, res, next) => {
  req.query.month = req.params.month;
  reviewController.getAllReviews(req, res, next);
});
router.get('/day/:day', authenticate, (req, res, next) => {
  req.query.day = req.params.day;
  reviewController.getAllReviews(req, res, next);
});
router.get('/user/:name/rating/:rating', authenticate, (req, res, next) => {
  req.query.name = req.params.name;
  req.query.rating = req.params.rating;
  reviewController.getAllReviews(req, res, next);
});
router.get('/country/:country/verified/:status', authenticate, (req, res, next) => {
  req.query.country = req.params.country;
  req.query.verifiedPurchase = req.params.status;
  reviewController.getAllReviews(req, res, next);
});
router.get('/helpfulness/:score', authenticate, (req, res, next) => {
  req.query.minHelpfulness = req.params.score;
  reviewController.getAllReviews(req, res, next);
});
router.get('/profile/:profileID', authenticate, (req, res, next) => {
  req.query.profile = req.params.profileID;
  reviewController.getAllReviews(req, res, next);
});
router.get('/review-link/:reviewID', authenticate, async (req, res, next) => {
  try {
    const review = await reviewService.getReviewById(req.params.reviewID);
    if (!review) return sendError(res, 'Review not found', 404);
    return sendSuccess(res, 'Review link fetched', { reviewLink: review.reviewLink });
  } catch (err) {
    next(err);
  }
});
router.get('/image/:status', authenticate, (req, res, next) => {
  req.query.hasImage = req.params.status === 'with' || req.params.status === 'true' ? 'true' : 'false';
  reviewController.getAllReviews(req, res, next);
});
router.get('/device/:deviceName', authenticate, (req, res, next) => {
  req.query.search = req.params.deviceName;
  reviewController.getAllReviews(req, res, next);
});

// Single Review CRUD
router.get('/:id', authenticate, reviewController.getReviewById);
router.post('/', authenticate, authorize('admin'), validate(validateReview), reviewController.createReview);
router.put('/:id', authenticate, authorize('admin'), validate(validateReview), reviewController.updateReview);
router.patch('/:id/rating', authenticate, authorize('admin'), reviewController.updateReviewRating);
router.delete('/:id', authenticate, authorize('admin'), reviewController.deleteReview);

module.exports = router;
