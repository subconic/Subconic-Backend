const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

/* =====================================================
   🧩 HELPER: Remove sensitive fields
===================================================== */
const sanitizeUser = (userDoc) => {
  const user = userDoc.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

/* =====================================================
   1️⃣ SIGNUP - Create New User
===================================================== */
router.post('/signup', async (req, res) => {
  try {
    const { email, name, password, mainGoal, currentPlan } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      name: name || '',
      password: hashedPassword,
      mainGoal: mainGoal || {},
      currentPlan: currentPlan || {},
      progress: {},
      reminders: []
    });

    res.status(201).json({
      message: 'User created successfully',
      user: sanitizeUser(newUser)
    });

  } catch (err) {
    res.status(500).json({
      message: 'Error in signup',
      error: err.message
    });
  }
});

/* =====================================================
   2️⃣ LOGIN - Authenticate User
===================================================== */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: sanitizeUser(user)
    });

  } catch (err) {
    res.status(500).json({
      message: 'Error in login',
      error: err.message
    });
  }
});

/* =====================================================
   3️⃣ GET USER BY ID (Same as Login Response)
===================================================== */
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User fetched successfully',
      user: sanitizeUser(user)
    });

  } catch (err) {
    res.status(500).json({
      message: 'Error fetching user',
      error: err.message
    });
  }
});

/* =====================================================
   4️⃣ UPDATE USER (Safe Update)
===================================================== */
router.put('/update/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // 🚫 Never allow password update here
    const { password, email, ...safeUpdates } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: safeUpdates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: sanitizeUser(updatedUser)
    });

  } catch (err) {
    res.status(500).json({
      message: 'Error updating user',
      error: err.message
    });
  }
});

/* =====================================================
   5️⃣ CHECK EMAIL EXISTS
===================================================== */
router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    const exists = await User.exists({ email });

    res.status(200).json({ exists: !!exists });

  } catch (err) {
    res.status(500).json({
      message: 'Error checking email',
      error: err.message
    });
  }
});

module.exports = router;
