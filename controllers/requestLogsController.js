const RequestLogs = require('../models').request_logs;
const { Op } = require('sequelize');

// Get all request logs
const getAllRequestLogs = async (req, res) => {
  try {
    const requestLogs = await RequestLogs.findAll();
    return res.status(200).json(requestLogs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get request logs by date range
const getRequestLogsByDateRange = async (req, res) => {
  try {
    const [start, end] = req.params.dates.split('&');

    if (!start || !end) {
      return res.status(400).json({ error: 'Start and end date are required' });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    const requestLogs = await RequestLogs.findAll({
      where: {
        date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate
        }
      }
    });

    if (!requestLogs.length) {
      return res.status(404).json({ error: 'No request logs found for the given date range' });
    }

    return res.status(200).json(requestLogs);
  } catch (error) {
    console.error('Error fetching request logs:', error);
    return res.status(500).json({ error: 'An error occurred while fetching request logs' });
  }
};

// Get request log by ID
const getRequestLogById = async (req, res) => {
  try {
    const requestLog = await RequestLogs.findByPk(req.params.id);
    if (!requestLog) {
      return res.status(404).json({ error: 'Request log not found' });
    }
    return res.status(200).json(requestLog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete request log by ID
const deleteRequestLog = async (req, res) => {
  try {
    const requestLog = await RequestLogs.findByPk(req.params.id);
    if (!requestLog) {
      return res.status(404).json({ error: 'Request log not found' });
    }
    await requestLog.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRequestLogs,
  getRequestLogsByDateRange,
  getRequestLogById,
  deleteRequestLog
};
