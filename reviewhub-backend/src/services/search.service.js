const Review = require('../models/review.model');

const searchGeneral = async (keyword) => {
  if (!keyword) return [];
  const regex = new RegExp(keyword, 'i');
  return await Review.find({
    $or: [{ title: regex }, { review: regex }, { name: regex }],
    isDeleted: false,
  });
};

const searchByTitle = async (keyword) => {
  if (!keyword) return [];
  const regex = new RegExp(keyword, 'i');
  return await Review.find({ title: regex, isDeleted: false });
};

const searchByUser = async (keyword) => {
  if (!keyword) return [];
  const regex = new RegExp(keyword, 'i');
  return await Review.find({ name: regex, isDeleted: false });
};

const searchByReviewsText = async (q) => {
  if (!q) return [];
  const regex = new RegExp(q, 'i');
  return await Review.find({ review: regex, isDeleted: false });
};

const searchByCountry = async (q) => {
  if (!q) return [];
  return await Review.distinct('country', {
    country: new RegExp(q, 'i'),
    isDeleted: false,
  });
};

const searchByUsers = async (q) => {
  if (!q) return [];
  return await Review.distinct('name', {
    name: new RegExp(q, 'i'),
    isDeleted: false,
  });
};

module.exports = {
  searchGeneral,
  searchByTitle,
  searchByUser,
  searchByReviewsText,
  searchByCountry,
  searchByUsers,
};
