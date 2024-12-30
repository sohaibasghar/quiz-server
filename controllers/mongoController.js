const User = require('../models/userModel'); // Define a MongoDB User model

// Create a MongoDB user
exports.createMongoUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({ message: 'MongoDB user created successfully.', data: savedUser });
  } catch (error) {
    console.error('Error creating MongoDB user:', error.message);
    res.status(500).json({ error: 'Failed to create MongoDB user.' });
  }
};

// Get all MongoDB users
exports.getAllMongoUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching MongoDB users:', error.message);
    res.status(500).json({ error: 'Failed to fetch MongoDB users.' });
  }
};
// Health check
exports.healthCheck = (req, res) => {
  res.send('Hello World!');
};
