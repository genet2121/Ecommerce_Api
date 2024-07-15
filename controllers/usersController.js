const Encryption = require('../infrastructure/service/authentatication/encryption'); 
const { users: Users } = require('../models'); 
const { sendEmail } = require('../utils/mailer');
const { generateVerificationToken } = require('../utils/token');
const { admin_types: AdminTypes } = require('../models'); 

const Sequelize = require('sequelize');
const getAllWithPagination = require('../utils/pagination');


const getSellerAndBuyerTypes = async () => {
  const adminTypes = await AdminTypes.findAll({
    where: {
      admin_type_name: {
        [Sequelize.Op.in]: ['seller', 'buyer']
      }
    }
  });
  
  const typesMap = {};
  adminTypes.forEach(type => {
    typesMap[type.admin_type_name] = type.id;
  });

  return typesMap;
};


// Create new user 
const createUser = async (req, res) => {
  try {
    const { firstname, lastname, username, business_name, email, password, user_type } = req.body;

    // Fetch the admin type IDs for seller and buyer
    const typesMap = await getSellerAndBuyerTypes();

    // Validate the user_type and get the corresponding admin_type_id
    const admin_type_id = typesMap[user_type];
    if (!admin_type_id) {
      return res.status(400).json({ error: 'Invalid user_type. Must be seller or buyer.' });
    }

    // Check if the email already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const encryption = new Encryption();
    const hashedPassword = await encryption.hash(password);

    // Generate the verification token
    const token = generateVerificationToken();

    // Create the user
    const user = await Users.create({
      admin_type_id,
      firstname,
      lastname,
      username,
      business_name,
      email,
      password: hashedPassword,
      user_type,
      verified: false,
      verification_token: token
    });

    // Send verification email
    const url = `http://localhost:8080/users/verify/${user.id}/${token}`;
    const msg = `Welcome to the e-commerce app. Please click <a href="${url}">here</a> to verify your email.`;
    const subject = 'Verify your email';
    await sendEmail(user.email, subject, msg);

    // Respond with success message
    res.status(201).json({ message: 'User created. Please check your email to verify your account.' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
};


// Upload user image
const uploadUserImage = async (req, res) => {
  const userId = req.params.id;
  const imagePath = req.file.path;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    user.image = imagePath;
    await user.save();

    return res.status(200).json({ message: 'Image uploaded successfully', user });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
};

// Verify user
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
    user.verification_token = '';
    await user.save();
    res.status(200).json({ message: 'Email verified successfully.' });
  } catch (error) {
    console.error('Error verifying user:', error); 
    res.status(400).json({ error: 'Invalid or expired token.' });

    return res.status(500).json({ error: error });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  const { firstname, lastname, username, email, user_type } = req.query;

  try {
    let whereClause = {};
    
    if (firstname) {
      whereClause.firstname = { [Op.like]: `%${firstname}%` };
    }
    if (lastname) {
      whereClause.lastname = { [Op.like]: `%${lastname}%` };
    }
    if (username) {
      whereClause.username = { [Op.like]: `%${username}%` };
    }
    if (email) {
      whereClause.email = { [Op.like]: `%${email}%` };
    }
    if (user_type) {
      whereClause.user_type = { [Op.eq]: user_type };
    }

    console.log('whereClause:', whereClause); 

    await getAllWithPagination(Users, req, res, whereClause, [
      {
        model: AdminTypes,
        as: 'admin_type'
      }
    ]);
  } catch (error) {
    console.error('Error in getAllusers:', error); 
    return res.status(500).json({ error: error.message });
  }
};

// Get users by ID
const getUserById = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error); 
    return res.status(500).json({ error: error });

  }
};

// Update users by ID
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
    return res.status(500).json({ error: error });

  }
};

// Delete user by ID
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
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  createUser,
  uploadUserImage,
  verifyUser,
  getSellerAndBuyerTypes,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
