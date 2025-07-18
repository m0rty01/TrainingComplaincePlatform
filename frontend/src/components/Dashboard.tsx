import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Dashboard: React.FC = () => {
  const [complianceStatus, setComplianceStatus] = useState('');
  const [trainingModules, setTrainingModules] = useState([]);

  useEffect(() => {
    const fetchComplianceStatus = async () => {
      // Fetch user compliance status from the backend
      // Placeholder for actual API call
      setComplianceStatus('Complete');
    };

    const fetchTrainingModules = async () => {
      try {
        const response = await fetch('/api/training');
        const data = await response.json();
        if (response.ok) {
          setTrainingModules(data);
        } else {
          console.error('Failed to fetch training modules:', data.error);
        }
      } catch (error) {
        console.error('Error fetching training modules:', error);
      }
    };

    fetchComplianceStatus();
    fetchTrainingModules();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        Compliance Status: {complianceStatus}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Upcoming Training Modules:
      </Typography>
      <List>
        {trainingModules.map((module: any, index: number) => (
          <ListItem key={index}>
            <ListItemText primary={module.title} secondary={`Duration: ${module.duration} hours, Status: ${module.completionStatus}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Dashboard;
