const buildReviewFilter = (query) => {
  const filter = { isDeleted: false };

  // Rating
  if (query.rating) {
    const rating = parseInt(query.rating, 10);
    filter.rating = rating;
  }
  if (query.exactRating) {
    filter.rating = parseInt(query.exactRating, 10);
  }
  if (query.minRating || query.maxRating) {
    filter.rating = {};
    if (query.minRating) filter.rating.$gte = parseInt(query.minRating, 10);
    if (query.maxRating) filter.rating.$lte = parseInt(query.maxRating, 10);
  }

  // Sentiment / Positive
  if (query.is_positive_review !== undefined) {
    filter.is_positive_review = parseInt(query.is_positive_review, 10);
  }
  if (query.positive !== undefined) {
    filter.is_positive_review = parseInt(query.positive, 10);
  }

  // Country
  if (query.country) {
    filter.country = new RegExp(query.country, 'i');
  }

  // Reviewer Name
  if (query.name) {
    filter.name = new RegExp(query.name, 'i');
  }

  // Verified Purchase
  if (query.verifiedPurchase !== undefined) {
    filter.verifiedPurchase = query.verifiedPurchase === 'True' || query.verifiedPurchase === 'true';
  }

  // Helpful Count Ranges
  if (query.minHelpful !== undefined || query.maxHelpful !== undefined) {
    filter.helpful = {};
    if (query.minHelpful !== undefined) filter.helpful.$gte = parseInt(query.minHelpful, 10);
    if (query.maxHelpful !== undefined) filter.helpful.$lte = parseInt(query.maxHelpful, 10);
  }
  if (query.hasHelpful === 'true') {
    filter.helpful = { $gt: 0 };
  }

  // Text Searches
  const searchTerm = query.search || query.contains || query.keyword;
  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    filter.$or = [
      { title: regex },
      { review: regex },
      { name: regex }
    ];
  }

  // Title Matches
  if (query.title) {
    filter.title = new RegExp(query.title, 'i');
  }
  if (query.titleContains) {
    filter.title = new RegExp(query.titleContains, 'i');
  }

  // Review Content Matches
  if (query.reviewContains) {
    filter.review = new RegExp(query.reviewContains, 'i');
  }
  if (query.hasReviewText === 'true') {
    filter.review = { $ne: '' };
  }

  // Date Filtering
  if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) filter.date.$gte = new Date(query.startDate);
    if (query.endDate) filter.date.$lte = new Date(query.endDate);
  }
  if (query.date) {
    const targetDate = new Date(query.date);
    const nextDay = new Date(query.date);
    nextDay.setDate(nextDay.getDate() + 1);
    filter.date = { $gte: targetDate, $lt: nextDay };
  }
  if (query.year) {
    const year = parseInt(query.year, 10);
    filter.date = {
      $gte: new Date(`${year}-01-01`),
      $lt: new Date(`${year + 1}-01-01`),
    };
  }
  if (query.month) {
    filter.$expr = filter.$expr || { $and: [] };
    filter.$expr.$and.push({ $eq: [{ $month: '$date' }, parseInt(query.month, 10)] });
  }
  if (query.day) {
    filter.$expr = filter.$expr || { $and: [] };
    filter.$expr.$and.push({ $eq: [{ $dayOfMonth: '$date' }, parseInt(query.day, 10)] });
  }

  // Image Presence
  if (query.hasImage === 'true') {
    filter.reviewImage = { $ne: '' };
  } else if (query.hasImage === 'false') {
    filter.reviewImage = '';
  }

  return filter;
};

const buildSort = (query) => {
  const sort = {};
  let sortBy = query.sortBy || query.sort || 'date';
  let order = query.order === 'desc' ? -1 : 1;

  if (typeof sortBy === 'string') {
    if (sortBy.startsWith('-')) {
      sortBy = sortBy.slice(1);
      order = -1;
    } else if (sortBy.startsWith('+')) {
      sortBy = sortBy.slice(1);
      order = 1;
    }
  }

  // Aliases mapping
  if (sortBy === 'helpfulness') sortBy = 'helpfulness_score';
  if (sortBy === 'helpful') sortBy = 'helpful';

  sort[sortBy] = order;
  return sort;
};

module.exports = { buildReviewFilter, buildSort };
