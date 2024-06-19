

const Encryption = require('../infrastructure/service/authentatication/encripution'); 
const { users: Users } = require('../models'); 
const { sendEmail } = require('../utils/mailer');
const { generateVerificationToken } = require('../utils/token');


const createUser = async (req, res) => {
  try {
    const { username, business_name, email, passwrd, user_type } = req.body;

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const encryption = new Encryption();
    const hashedPassword = await encryption.hash(passwrd);
    const token = generateVerificationToken();
    const user = await Users.create({
       username, 
       business_name, 
       email, 
       passwrd: hashedPassword, 
       user_type, 
       verified: false, 
       verification_token: token });

    const url = `http://localhost:8080/api/users/verify/${user.id}/${token}`;
    let msg = `Please click <a href="${url}">here</a> to verify your email.`
    let subject = 'Verify your email';
    await sendEmail(user.email, subject, msg);
    res.status(201).json({ message: 'User created. Please check your email to verify your account.' });
  } catch (error) {

    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const verifyUser = async (req, res) => {
  try {
    const { token, id } = req.params;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(400).json({ error: 'Invalid token or user does not exist.' });
    }

    if(user.verification_token != token) {
      return res.status(400).json({ error: 'Verification failed!' });
    }

    user.verified = true;
    await user.save();
    res.status(200).json({ message: 'Email verified successfully.' });
  } catch (error) {
    console.error('Error verifying user:', error); 
    res.status(400).json({ error: 'Invalid or expired token.' });

    return res.status(500).json({ error: error });
  }
};

// Upload user image
const uploadImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const imagePath = req.file.path;
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update({ image: imagePath });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error });

  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ['passwrd'] }
    });
    res.status(200).json(users);
  } catch (error) {

    console.error('Error fetching users:', error); 
    res.status(500).json({ error: 'Internal server error' });

    return res.status(500).json({ error: error });

  }
};

const getUserById = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id, {
      attributes: { exclude: ['passwrd'] }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {

    console.error('Error fetching user:', error); 
    res.status(500).json({ error: 'Internal server error' });

    return res.status(500).json({ error: error });

  }
};

const updateUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update(req.body);
    res.status(200).json(user);
  } catch (error) {

    console.error('Error updating user:', error); 
    res.status(500).json({ error: 'Internal server error' });

    return res.status(500).json({ error: error });

  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error); 
    res.status(500).json({ error: 'Internal server error' });

    return res.status(500).json({ error: error });

  }
};

module.exports = {
  createUser,
  uploadImage,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  verifyUser
};
