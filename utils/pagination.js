
const getAllWithpagination = async (Model, req, res) => {
    try {
      const { page = 1, size = 10 } = req.query;
      const limit = parseInt(size);
      const offset = (parseInt(page) - 1) * limit;
  
      const { count, rows } = await Model.findAndCountAll({
        limit,
        offset
      });
  
      res.json({
        totalItems: count,
        items: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page)
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = getAllWithpagination;
  
