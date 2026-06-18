const reviewService = require('../services/review.service');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const pagination = require('../utils/pagination');
const filterBuilder = require('../utils/filterBuilder');

const getAllReviews = async (req, res, next) => {
  try {
    const { page, limit } = pagination.parse(req.query);
    const filter = filterBuilder.buildReviewFilter(req.query);
    const sort = filterBuilder.buildSort(req.query);

    const { data, total } = await reviewService.getAllReviews({
      filter,
      skip: pagination.skip(page, limit),
      limit,
      sort,
    });

    return sendSuccess(res, 'Reviews fetched successfully', {
      reviews: data,
      pagination: pagination.format(page, limit, total),
    });
  } catch (err) {
    next(err);
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);
    if (!review) {
      return sendError(res, 'Review not found', 404);
    }
    return sendSuccess(res, 'Review fetched successfully', { review });
  } catch (err) {
    next(err);
  }
};

const createReview = async (req, res, next) => {
  try {
    const review = await reviewService.createReview(req.body);
    return sendSuccess(res, 'Review created successfully', { review }, 201);
  } catch (err) {
    next(err);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const review = await reviewService.updateReview(req.params.id, req.body);
    if (!review) {
      return sendError(res, 'Review not found', 404);
    }
    return sendSuccess(res, 'Review updated successfully', { review });
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await reviewService.softDeleteReview(req.params.id);
    if (!review) {
      return sendError(res, 'Review not found', 404);
    }
    return sendSuccess(res, 'Review deleted successfully');
  } catch (err) {
    next(err);
  }
};

const updateReviewRating = async (req, res, next) => {
  try {
    const { rating } = req.body;
    if (!rating) {
      return sendError(res, 'Rating is required', 400);
    }
    const review = await reviewService.updateReviewRating(req.params.id, rating);
    if (!review) {
      return sendError(res, 'Review not found', 404);
    }
    return sendSuccess(res, 'Rating updated successfully', { review });
  } catch (err) {
    next(err);
  }
};

const searchReviews = async (req, res, next) => {
  try {
    const { q, page, limit } = req.query;
    if (!q) {
      return sendError(res, 'Search query (q) is required', 400);
    }

    const { page: p, limit: l } = pagination.parse({ page, limit });
    const { data, total } = await reviewService.searchReviews({
      searchTerm: q,
      skip: pagination.skip(p, l),
      limit: l,
    });

    return sendSuccess(res, 'Search results fetched', {
      reviews: data,
      pagination: pagination.format(p, l, total),
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit } = pagination.parse(req.query);
    const { data, total } = await reviewService.getAllUsers({
      skip: pagination.skip(page, limit),
      limit,
    });
    return sendSuccess(res, 'Users fetched successfully', {
      users: data,
      pagination: pagination.format(page, limit, total),
    });
  } catch (err) {
    next(err);
  }
};

const getAllCountries = async (req, res, next) => {
  try {
    const { page, limit } = pagination.parse(req.query);
    const { data, total } = await reviewService.getAllCountries({
      skip: pagination.skip(page, limit),
      limit,
    });
    return sendSuccess(res, 'Countries fetched successfully', {
      countries: data,
      pagination: pagination.format(page, limit, total),
    });
  } catch (err) {
    next(err);
  }
};

const getRatings = async (req, res, next) => {
  try {
    const ratings = await reviewService.getRatingsData();
    return sendSuccess(res, 'Ratings data fetched successfully', { ratings });
  } catch (err) {
    next(err);
  }
};

const getVerifiedReviews = async (req, res, next) => {
  try {
    const { page, limit } = pagination.parse(req.query);
    const { data, total } = await reviewService.getAllReviews({
      filter: { verifiedPurchase: true, isDeleted: false },
      skip: pagination.skip(page, limit),
      limit,
      sort: { date: -1 },
    });
    return sendSuccess(res, 'Verified reviews fetched successfully', {
      reviews: data,
      pagination: pagination.format(page, limit, total),
    });
  } catch (err) {
    next(err);
  }
};

const compareUsers = async (req, res, next) => {
  try {
    const { user1, user2 } = req.query;
    if (!user1 || !user2) {
      return sendError(res, 'user1 and user2 query parameters are required', 400);
    }
    const comparison = await reviewService.compareUsers(user1, user2);
    return sendSuccess(res, 'User comparison fetched successfully', comparison);
  } catch (err) {
    next(err);
  }
};

const compareRatings = async (req, res, next) => {
  try {
    const { rating1, rating2 } = req.query;
    if (!rating1 || !rating2) {
      return sendError(res, 'rating1 and rating2 query parameters are required', 400);
    }
    const comparison = await reviewService.compareRatings(parseInt(rating1, 10), parseInt(rating2, 10));
    return sendSuccess(res, 'Rating comparison fetched successfully', comparison);
  } catch (err) {
    next(err);
  }
};

const getRandomReview = async (req, res, next) => {
  try {
    const review = await reviewService.getRandomReview();
    return sendSuccess(res, 'Random review fetched successfully', { review });
  } catch (err) {
    next(err);
  }
};

const getAISummary = async (req, res, next) => {
  try {
    const summary = await reviewService.getAISummary();
    return sendSuccess(res, 'AI summary fetched successfully', summary);
  } catch (err) {
    next(err);
  }
};

const getSentimentAnalysis = async (req, res, next) => {
  try {
    const analysis = await reviewService.getSentimentAnalysis();
    return sendSuccess(res, 'Sentiment analysis fetched successfully', analysis);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  updateReviewRating,
  searchReviews,
  getAllUsers,
  getAllCountries,
  getRatings,
  getVerifiedReviews,
  compareUsers,
  compareRatings,
  getRandomReview,
  getAISummary,
  getSentimentAnalysis,
};
