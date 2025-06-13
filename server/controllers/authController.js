// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Signup
// exports.signup = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     const lowercaseEmail = email.toLowerCase();
//     const existingUser = await User.findOne({ email: lowercaseEmail });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Temporary: Store password in plain text for debugging
//     const user = new User({
//       email: lowercaseEmail,
//       password: password, // Plain text password (not secure, only for debugging)
//     });

//     const savedUser = await user.save();
//     if (!savedUser) {
//       throw new Error('Failed to save user');
//     }
//     console.log('User saved:', savedUser);

//     const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(201).json({ message: 'User created successfully', token });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ message: 'Error during signup', error: error.message });
//   }
// };

// // Login
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       console.log('Missing email or password:', { email, password });
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     const lowercaseEmail = email.toLowerCase();
//     const user = await User.findOne({ email: lowercaseEmail });
//     if (!user) {
//       console.log('User not found for email:', lowercaseEmail);
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Temporary: Compare plain text passwords
//     console.log('Attempting password verification for user:', user.email);
//     const isMatch = password === user.password;
//     console.log('Password match result:', isMatch);
//     if (!isMatch) {
//       console.log('Password does not match for user:', user.email);
//       console.log('Provided password:', password);
//       console.log('Stored password:', user.password);
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ message: 'Login successful', token, email: user.email });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Error during login', error: error.message });
//   }
// };

// // Get Profile
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select('email');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ email: user.email });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching profile', error: error.message });
//   }
// };


const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Function to hash password using crypto
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Signup
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const lowercaseEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: lowercaseEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = hashPassword(password);
    const user = new User({
      email: lowercaseEmail,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    if (!savedUser) {
      throw new Error('Failed to save user');
    }
    console.log('User saved:', savedUser);

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error during signup', error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Missing email or password:', { email, password });
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const lowercaseEmail = email.toLowerCase();
    const user = await User.findOne({ email: lowercaseEmail });
    if (!user) {
      console.log('User not found for email:', lowercaseEmail);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const hashedInputPassword = hashPassword(password);
    console.log('Attempting password verification for user:', user.email);
    const isMatch = hashedInputPassword === user.password;
    console.log('Password match result:', isMatch);
    if (!isMatch) {
      console.log('Password does not match for user:', user.email);
      console.log('Provided hashed password:', hashedInputPassword);
      console.log('Stored hashed password:', user.password);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, email: user.email });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// Ensure proper exports
module.exports = {
  signup: exports.signup,
  login: exports.login,
  getProfile: exports.getProfile,
};