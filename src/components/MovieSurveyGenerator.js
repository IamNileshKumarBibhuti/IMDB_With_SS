import './MovieSurveyGenerator.css';// Ensure this import is uncommented to apply your CSS styles
import React, { useState } from 'react';
import { Flex, Text, Input, Button } from "@sparrowengg/twigs-react";

const MovieSurveyGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(''); // New state for input validation feedback

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
        setError(''); // Clear error message when user starts typing
    };

    const generateQuestions = () => {
        if (!prompt || prompt.length < 3) { // Basic validation for prompt length
            setError('Please enter a more detailed prompt.'); // Set error message
            return;
        }

        // Example logic to generate questions based on the prompt
        const sampleQuestions = [
            `What do you think about the plot of ${prompt}?`,
            `How would you rate the characters in ${prompt}?`,
            `What's your favorite scene in ${prompt}?`,
        ];

        setQuestions(sampleQuestions);
    };

    return (
        <Flex className="survey-container" flexDirection="column" gap="$3">
            <Input
                className="survey-input"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter a movie theme or title..."
            />
            {error && <Text className="survey-error">{error}</Text>} {/* Display error message if present */}
            <Button className="survey-button" onClick={generateQuestions}>Generate Questions</Button>
            {questions.length > 0 && (
                questions.map((question, index) => (
                    <Text key={index} className="survey-question">{question}</Text> // Apply styles to each question
                ))
            )}
        </Flex>
    );
};

export default MovieSurveyGenerator;
