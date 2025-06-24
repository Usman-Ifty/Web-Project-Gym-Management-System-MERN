const express = require('express');
const router = express.Router();
const Review = require('../models/review');
router.put('/:id', async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReview) return res.status(404).json({ error: 'Review not found' });
        res.json(updatedReview);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update review' });
    }
});

// DELETE: Delete review by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) return res.status(404).json({ error: 'Review not found' });
        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete review' });
    }
});
// POST: Add review
router.post('/', async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json({ message: 'Review submitted!', review });
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit review' });
    }
});

// GET: Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// GET: Get review by ID
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ error: 'Review not found' });
        res.json(review);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch review' });
    }
});

module.exports = router;