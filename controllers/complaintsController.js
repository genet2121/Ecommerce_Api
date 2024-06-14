const Complaints = require('../models').complaints;

// Create a new complaint
const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaints.create(req.body);
    return res.status(201).json(complaint);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaints.findAll();
    return res.status(200).json(complaints);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get complaint by ID
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaints.findByPk(req.params.id);
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    return res.status(200).json(complaint);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update complaint by ID
const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaints.findByPk(req.params.id);
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    await complaint.update(req.body);
    return res.status(200).json(complaint);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete complaint by ID
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaints.findByPk(req.params.id);
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    await complaint.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint
};
