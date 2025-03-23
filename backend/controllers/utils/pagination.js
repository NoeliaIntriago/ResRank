// utils/pagination.js
exports.getPagination = (page, perPage) => {
  const limit = perPage ? +perPage : 10;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
};

exports.getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: results } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { results, totalItems, totalPages, currentPage, perPage: limit };
};
