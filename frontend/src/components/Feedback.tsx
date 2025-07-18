import React, { useState } from 'react';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState<string[]>([]);

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(event.target.value);
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      setFeedbackList([...feedbackList, feedback]);
      setFeedback('');
      // Optionally send feedback to the backend
    }
  };

  return (
    <Container>
      <Typography variant="h5" component="h2" gutterBottom>
        User Feedback
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Your Feedback"
        value={feedback}
        onChange={handleFeedbackChange}
      />
      <Button variant="contained" color="primary" onClick={handleFeedbackSubmit}>
        Submit
      </Button>
      <List>
        {feedbackList.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Feedback; 