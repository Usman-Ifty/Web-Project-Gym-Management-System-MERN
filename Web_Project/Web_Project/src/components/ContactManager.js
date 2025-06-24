import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactManager = () => {
    const [contacts, setContacts] = useState([]);
    const [editingContact, setEditingContact] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/contact');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/contact/${id}`);
            fetchContacts();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handleEdit = (contact) => {
        setEditingContact(contact._id);
        setFormData({
            name: contact.name,
            email: contact.email,
            subject: contact.subject,
            message: contact.message
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/contact/${editingContact}`, formData);
            setEditingContact(null);
            setFormData({ name: '', email: '', subject: '', message: '' });
            fetchContacts();
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Contact Messages</h2>
            
            {editingContact && (
                <form onSubmit={handleUpdate} className="mb-6 p-4 border rounded">
                    <h3 className="text-xl mb-4">Edit Contact Message</h3>
                    <div className="mb-4">
                        <label className="block mb-2">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Subject:</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Message:</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Update Message
                    </button>
                    <button
                        type="button"
                        onClick={() => setEditingContact(null)}
                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </form>
            )}

            <div className="grid gap-4">
                {contacts.map((contact) => (
                    <div key={contact._id} className="border p-4 rounded">
                        <h3 className="font-bold">{contact.name}</h3>
                        <p className="text-gray-600">{contact.email}</p>
                        <p className="font-semibold mt-2">{contact.subject}</p>
                        <p className="mt-2">{contact.message}</p>
                        <div className="mt-4">
                            <button
                                onClick={() => handleEdit(contact)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(contact._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactManager;