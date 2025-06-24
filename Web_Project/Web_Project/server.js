const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const feedbackRoutes = require('./routes/feedbackRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const contactRoutes = require('./routes/contactRoutes');
const cors = require('cors');
const app = express();
app.use(cors()); 
app.use(bodyParser.json()); 

app.use('/api/feedback', feedbackRoutes);
app.use('/api/review', reviewRoutes);``
app.use('/api/contact', contactRoutes);

const userRoutes = require('./routes/userRoutes');

mongoose.connect('mongodb://localhost:27017/gymPro')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use('/api', userRoutes);  

app.get('/', (req, res) => {
  res.send('Welcome to GymPro API!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
