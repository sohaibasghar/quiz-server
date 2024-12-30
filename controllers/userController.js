const User = require('../models/userModal');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { age, gender, education, ethnicity, nationality, issue, religious_affiliation, lived_year } = req.body;

    if (!age || !gender || !education || !ethnicity || !nationality || !issue || !religious_affiliation || !lived_year) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const user = new User({
      age,
      gender,
      education,
      ethnicity,
      nationality,
      issue,
      religious_affiliation,
      lived_year,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully.', id: user._id });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Failed to create user.' });
  }
};

// Health check
exports.healthCheck = (req, res) => {
  res.send('Hello World!');
};