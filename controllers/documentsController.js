const Documents = require('../models').documents;

// Create a new document
const createDocument = async (req, res) => {
  try {
    const document = await Documents.create(req.body);
    return res.status(201).json(document);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all documents
const getAllDocuments = async (req, res) => {
  try {
    const documents = await Documents.findAll();
    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
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
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument
};