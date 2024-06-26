const Documents = require('../models').documents;
const { Op } = require('sequelize');
const getAllWithPagination = require('../utils/pagination');
const Users = require('../models').users;


// Create a new document
const createDocument = async (req, res) => {
  try {
    const { user_id, doc_type } = req.body;

    const document = await Documents.create({
      user_id: user_id,
      doc_type: doc_type,
      doc: ''
    });

    return res.status(201).json(document);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Upload document file
const uploadDocumentFile = async (req, res) => {
  const documentId = req.params.id;
  const filePath = req.file.path;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const document = await Documents.findByPk(documentId);
    if (!document) {
      return res.status(404).json({ error: 'document not found' });
    }

    document.doc = filePath;
    await document.save();

    return res.status(200).json({ message: 'Image uploaded successfully', document });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
};

// Get all documents
const getAllDocuments = async (req, res) => {
  const { user_id, doc_type} = req.query; 

  try {
    let whereClause = {};
    
    if (doc_type) {
      whereClause.doc_type = { [Op.like]: `%${doc_type}%` }; 
    }
    if (user_id) {
      whereClause.user_id = { [Op.eq]: user_id }; 
    }
    
    await getAllWithPagination(Documents, req, res, whereClause, [
      {
        model: Users,
        as: 'user',
      }
    ]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get document by ID
const getDocumentById = async (req, res) => {
  try {
    const document = await Documents.findByPk(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    return res.status(200).json(document);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Update document by ID
const updateDocument = async (req, res) => {
  try {
    const document = await Documents.findByPk(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    await document.update(req.body);
    return res.status(200).json(document);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Delete document by ID
const deleteDocument = async (req, res) => {
  try {
    const document = await Documents.findByPk(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    await document.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createDocument,
  uploadDocumentFile,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument
};