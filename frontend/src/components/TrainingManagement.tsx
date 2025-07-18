import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const TrainingManagement: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [complianceRequired, setComplianceRequired] = useState(false);

  const handleCreateModule = async () => {
    try {
      const response = await fetch('/api/training', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, duration, complianceRequired }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Training module created:', data);
        // Reset form fields
        setTitle('');
        setDescription('');
        setDuration(0);
        setComplianceRequired(false);
      } else {
        console.error('Failed to create training module:', data.error);
      }
    } catch (error) {
      console.error('Error creating training module:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Training Management
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Duration (hours)"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCreateModule}
      >
        Create Training Module
      </Button>
    </Container>
  );
};

export default TrainingManagement;
