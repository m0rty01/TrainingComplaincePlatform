import React, { useState } from 'react';
import { Container, Typography, Button, TextField } from '@mui/material';

const Quiz: React.FC = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (question: string, value: string) => {
    setAnswers({ ...answers, [question]: value });
  };

  const handleSubmit = () => {
    console.log('Quiz submitted:', answers);
    setSubmitted(true);
    // Optionally send answers to the backend
  };

  return (
    <Container>
      <Typography variant="h5" component="h2" gutterBottom>
        Reflection Quiz
      </Typography>
      {!submitted ? (
        <div>
          <Typography variant="body1">1. What did you learn from the video?</Typography>
          <TextField
            fullWidth
            margin="normal"
            onChange={(e) => handleChange('question1', e.target.value)}
          />
          <Typography variant="body1">2. How will you apply this knowledge?</Typography>
          <TextField
            fullWidth
            margin="normal"
            onChange={(e) => handleChange('question2', e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      ) : (
        <Typography variant="body1" color="primary">
          Thank you for your responses!
        </Typography>
      )}
    </Container>
  );
};

export default Quiz; 