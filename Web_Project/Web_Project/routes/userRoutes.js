const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials. Please try again.' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

router.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    console.log("Received data:", { name, email, password });
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'User created successfully' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});

module.exports = router;
