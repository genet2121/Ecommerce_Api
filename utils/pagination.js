
const getAllWithPagination = async (model, req, res, whereClause = {}, joins = []) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.size) || 10;

  try {
    const { count, rows } = await model.findAndCountAll({
      where: whereClause, 
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [['createdAt', 'DESC']],
      include: joins
    });

    return res.status(200).json({ total: count, page: page, perPage: perPage, data: rows });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllWithPagination;

