import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Box,
  Alert,
  FormControlLabel,
  Switch,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ConceptInfo {
  concept_uid: string;
  concept_name: string;
  description: string;
  email: string;
  phone: string;
  about: string;
  tags: string[];
  status: {
    active: boolean;
  };
}

const SetupConcept: React.FC = () => {
  const navigate = useNavigate();
  const [conceptInfo, setConceptInfo] = useState<ConceptInfo>({
    concept_uid: '',
    concept_name: '',
    description: '',
    email: '',
    phone: '',
    about: '',
    tags: [],
    status: {
      active: true
    }
  });
  
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleChange = (field: string, value: string | boolean) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setConceptInfo(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof ConceptInfo] as any),
          [child]: value
        }
      }));
    } else {
      setConceptInfo(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !conceptInfo.tags.includes(newTag.trim())) {
      setConceptInfo(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setConceptInfo(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Generate UID from name if not provided
      if (!conceptInfo.concept_uid && conceptInfo.concept_name) {
        conceptInfo.concept_uid = conceptInfo.concept_name.toLowerCase().replace(/\s+/g, '_');
      }
      
      // TODO: Implement actual save logic with API call
      console.log('Saving concept info:', conceptInfo);
      setSaveMessage('Concept created successfully!');
      setTimeout(() => {
        setSaveMessage('');
        navigate('/menu/concept/dashboard');
      }, 2000);
    } catch (error) {
      setSaveMessage('Error creating concept');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Setup New Concept
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Create a new concept for your menu management system.
        </Typography>

        {saveMessage && (
          <Alert severity={saveMessage.includes('Error') ? 'error' : 'success'} sx={{ mb: 3 }}>
            {saveMessage}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Concept Name"
              value={conceptInfo.concept_name}
              onChange={(e) => handleChange('concept_name', e.target.value)}
              required
              helperText="This will be the display name for your concept"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Concept UID"
              value={conceptInfo.concept_uid}
              onChange={(e) => handleChange('concept_uid', e.target.value)}
              required
              helperText="Unique identifier (auto-generated if left empty)"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={conceptInfo.description}
              onChange={(e) => handleChange('description', e.target.value)}
              multiline
              rows={2}
              helperText="Brief description of the concept"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="About"
              value={conceptInfo.about}
              onChange={(e) => handleChange('about', e.target.value)}
              multiline
              rows={3}
              helperText="Detailed information about the concept"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={conceptInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              helperText="Contact email for this concept"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              value={conceptInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              helperText="Contact phone for this concept"
            />
          </Grid>
          
          {/* Tags Section */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Tags</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                label="Add Tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                size="small"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button variant="outlined" onClick={handleAddTag}>
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {conceptInfo.tags.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  color="primary"
                />
              ))}
            </Box>
          </Grid>

          {/* Status */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Status</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={conceptInfo.status.active}
                  onChange={(e) => handleChange('status.active', e.target.checked)}
                />
              }
              label="Active"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/menu')}
            size="large"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isSaving || !conceptInfo.concept_name}
            size="large"
          >
            {isSaving ? 'Creating...' : 'Create Concept'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SetupConcept;