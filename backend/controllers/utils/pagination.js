// utils/pagination.js
exports.getPagination = (page, perPage) => {
  const limit = perPage ? +perPage : 10;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
};

exports.getPagingData = (data, page, limit) => {
  const totalItems = data?.count ?? 0;
  const results = Array.isArray(data?.rows) ? data.rows : [];
  const currentPage = page ? +page : 1;
  const totalPages =
    totalItems === 0 ? 0 : Math.ceil(totalItems / (limit || 10));

  return { results, totalItems, totalPages, currentPage, perPage: limit };
};
