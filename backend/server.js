// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Apply middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Define a schema and model for the responses
const responseSchema = new mongoose.Schema({
  movieTitle: String,
  questions: [String],
  responses: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Response = mongoose.model('Response', responseSchema);

// Endpoint to generate questions using OpenAI
app.post('/generate-questions', async (req, res) => {
    const { movieTitle } = req.body;
    const prompt = `Generate three insightful questions about the movie "${movieTitle}":`;

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt,
            max_tokens: 100,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const questions = response.data.choices[0].text.trim().split('\n').filter(q => q);
        res.json({ questions });
    } catch (error) {
        console.error('Error generating questions with OpenAI:', error);
        res.status(500).json({ error: 'Failed to generate questions' });
    }
});

// Endpoint to save user responses
app.post('/save-responses', async (req, res) => {
    const { movieTitle, questions, responses } = req.body;

    try {
        const newResponseEntry = new Response({
            movieTitle,
            questions,
            responses
        });

        await newResponseEntry.save();
        res.json({ message: 'Responses saved successfully' });
    } catch (error) {
        console.error('Error saving responses:', error);
        res.status(500).json({ error: 'Failed to save responses' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
