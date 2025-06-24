const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// POST: Add contact message
router.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ message: 'Message submitted!', contact });
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit message' });
    }
});

// GET: Get all contact messages
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// GET: Get contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ error: 'Contact not found' });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch contact' });
    }
});

// PUT: Update contact by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) return res.status(404).json({ error: 'Contact not found' });
        res.json(updatedContact);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update contact' });
    }
});

// DELETE: Delete contact by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) return res.status(404).json({ error: 'Contact not found' });
        res.json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete contact' });
    }
});

module.exports = router;