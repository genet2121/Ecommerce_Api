const Documents = require('../models').documents;

// Create a new document
const createDocument = async (req, res) => {
  try {
    const { user_id, doc_type } = req.body;
    const filePath = req.file.path;

    const document = await Documents.create({
      user_id: user_id,
      doc_type: doc_type,
      doc: filePath
    });

    return res.status(201).json(document);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get all documents
const getAllDocuments = async (req, res) => {
  try {
    const documents = await Documents.findAll();
    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({ error: error });
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
    const filePath = req.file.path;
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    await document.update(req.body);
    await document.update({ doc: filePath });
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
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument
};