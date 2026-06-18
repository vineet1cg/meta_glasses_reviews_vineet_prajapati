const searchService = require('../services/search.service');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const searchGeneral = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return sendError(res, 'Keyword is required', 400);
    }
    const results = await searchService.searchGeneral(keyword);
    return sendSuccess(res, 'Search successful', { reviews: results });
  } catch (err) {
    next(err);
  }
};

const searchByTitle = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return sendError(res, 'Keyword is required', 400);
    }
    const results = await searchService.searchByTitle(keyword);
    return sendSuccess(res, 'Title search successful', { reviews: results });
  } catch (err) {
    next(err);
  }
};

const searchByUser = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return sendError(res, 'Keyword is required', 400);
    }
    const results = await searchService.searchByUser(keyword);
    return sendSuccess(res, 'User search successful', { reviews: results });
  } catch (err) {
    next(err);
  }
};

const searchByReviewsText = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return sendError(res, 'Query parameter q is required', 400);
    }
    const results = await searchService.searchByReviewsText(q);
    return sendSuccess(res, 'Reviews text search successful', { reviews: results });
  } catch (err) {
    next(err);
  }
};

const searchByCountry = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return sendError(res, 'Query parameter q is required', 400);
    }
    const results = await searchService.searchByCountry(q);
    return sendSuccess(res, 'Country search successful', { countries: results });
  } catch (err) {
    next(err);
  }
};

const searchByUsers = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return sendError(res, 'Query parameter q is required', 400);
    }
    const results = await searchService.searchByUsers(q);
    return sendSuccess(res, 'Users search successful', { users: results });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  searchGeneral,
  searchByTitle,
  searchByUser,
  searchByReviewsText,
  searchByCountry,
  searchByUsers,
};
