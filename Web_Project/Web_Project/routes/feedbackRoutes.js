const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

router.put('/:id', async (req, res) => {
    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFeedback) return res.status(404).json({ error: 'Feedback not found' });
        res.json(updatedFeedback);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update feedback' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!deletedFeedback) return res.status(404).json({ error: 'Feedback not found' });
        res.json({ message: 'Feedback deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete feedback' });
    }
});

router.post('/', async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted!', feedback });
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit feedback' });
    }
});

router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch feedback' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
        res.json(feedback);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch feedback' });
    }
});

module.exports = router;