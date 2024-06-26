const Complaints = require('../models').complaints;
const { Op } = require('sequelize');
const getAllWithPagination = require('../utils/pagination');
const Users = require('../models').users

// Create a new complaint
const createComplaint = async (req, res) => {
  try {
    const { topic, complainee_id, complaint_text, status_in } = req.body;

    const complaint = await Complaints.create({
      topic: topic,
      complainee_id: complainee_id,
      complaint_text: complaint_text,
      complaint_images: '',
      status_in: status_in
    });

    return res.status(201).json(complaint);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Upload complaint image
const uploadComplaintDocument = async (req, res) => {
  const complaintId = req.params.id;
  const docPath = req.file.path;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const complaint = await Complaints.findByPk(complaintId);
    if (!complaint) {
      return res.status(404).json({ error: 'complaint not found' });
    }

    complaint.complaint_doc = docPath;
    await complaint.save();

    return res.status(200).json({ message: 'Image uploaded successfully', complaint });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
};

// Get all complaints
const getAllComplaints = async (req, res) => {
  const { topic, complainee_id, complaint_text, status_in} = req.query; 

  try {
    let whereClause = {};
    if (topic) {
      whereClause.topic = { [Op.like]: `%${topic}%` }; 
    }
    
    if (complaint_text) {
      whereClause.complaint_text = { [Op.like]: `%${complaint_text}%` }; 
    }
    if (status_in) {
      whereClause.status_in = { [Op.like]: `%${status_in}%` }; 
    }
   
    if (complainee_id) {
      whereClause.complainee_id = { [Op.eq]: complainee_id }; 
    }

    
    await getAllWithPagination(Complaints, req, res, whereClause, [
      {
        model: Users,
        as: 'complainee',
      }
    ]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
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
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createComplaint,
  uploadComplaintDocument,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint
};
