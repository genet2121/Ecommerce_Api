// const Users = require('../models').users;
// const { sendVerificationEmail } = require('../utils/mailer');
// const { generateVerificationToken } = require('../utils/token');
// const jwt = require('jsonwebtoken');

// // Create a new user
// const createUser = async (req, res) => {
//   try {
//     const user = await Users.create(req.body);
//     const token = generateVerificationToken(user);
//     await sendVerificationEmail(user.email, token);
//     res.status(201).json({ message: 'User created. Please check your email to verify your account.' });

//     //return res.status(201).json(user);
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const verifyUser = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const decoded = jwt.verify(token, 'your-secret-key');
//     const user = await User.findByPk(decoded.id);
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid token or user does not exist.' });
//     }
//     user.verified = true;
//     await user.save();
//     res.status(200).json({ message: 'Email verified successfully.' });
//   } catch (err) {
//     res.status(400).json({ error: 'Invalid or expired token.' });
//   }
// };



// // Get all users
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await Users.findAll({
//       attributes: { exclude: ['passwrd'] }
//     });
//     return res.status(200).json(users);
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // Get user by ID
// const getUserById = async (req, res) => {
//   try {
//     const user = await Users.findByPk(req.params.id, {
//       attributes: { exclude: ['passwrd'] }
//     });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // Update user by ID
// const updateUser = async (req, res) => {
//   try {
//     const user = await Users.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     await user.update(req.body);
//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // Delete user by ID
// const deleteUser = async (req, res) => {
//   try {
//     const user = await Users.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     await user.destroy();
//     return res.status(204).send();
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = {
//   createUser,
//   getAllUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
//   verifyUser
// };


const { users: Users } = require('../models'); // Correct import syntax for sequelize models
const { sendVerificationEmail } = require('../utils/mailer');
const { generateVerificationToken } = require('../utils/token');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const { username, business_name, email, passwrd, user_type } = req.body;

    // Check if email already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await Users.create({ username, business_name, email, passwrd, user_type });
    const token = generateVerificationToken(user);
    await sendVerificationEmail(user.email, token);
    res.status(201).json({ message: 'User created. Please check your email to verify your account.' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const verifyUser = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findByPk(decoded.id);
    if (!user) {
      return res.status(400).json({ error: 'Invalid token or user does not exist.' });
    }
    user.verified = true;
    await user.save();
    res.status(200).json({ message: 'Email verified successfully.' });
  } catch (error) {
    console.error('Error verifying user:', error); // Improved error logging
    res.status(400).json({ error: 'Invalid or expired token.' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ['passwrd'] }
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error); // Improved error logging
    res.status(500).json({ error: 'Internal server error' });
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
    console.error('Error fetching user:', error); // Improved error logging
    res.status(500).json({ error: 'Internal server error' });
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
    console.error('Error updating user:', error); // Improved error logging
    res.status(500).json({ error: 'Internal server error' });
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
    console.error('Error deleting user:', error); // Improved error logging
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  verifyUser
};
