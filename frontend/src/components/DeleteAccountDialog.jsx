import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { deleteUser } from '../utils/api';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Alert,
  CircularProgress,
  Typography,
  Divider,
  TextField,
} from '@mui/material';
import { 
  Warning as WarningIcon, 
  Delete as DeleteIcon, 
  Cancel as CancelIcon 
} from '@mui/icons-material';

const DeleteAccountDialog = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleDelete = async () => {
    if (confirmation !== 'DELETE') {
      setError('Please type "DELETE" to confirm');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await deleteUser(user.id);
      await logout();
      navigate('/');
    } catch (error) {
      setError(error.error || 'Failed to delete account');
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setConfirmation('');
      setError('');
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="error" />
          <Typography variant="h6" component="span" fontWeight="bold" color="error">
            Delete Account
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          This action cannot be undone
        </Typography>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ pt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
            Warning: This action is permanent!
          </Typography>
          <Typography variant="body2">
            Deleting your account will permanently remove all your data and cannot be undone. 
            You will lose access to your profile and all associated information.
          </Typography>
        </Alert>

        <Typography variant="body1" sx={{ mb: 2 }}>
          To confirm deletion, please type <strong>DELETE</strong> in the field below:
        </Typography>
        
        <TextField
          fullWidth
          label="Type DELETE to confirm"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          disabled={loading}
          error={confirmation !== '' && confirmation !== 'DELETE'}
          helperText={
            confirmation !== '' && confirmation !== 'DELETE' 
              ? 'Please type "DELETE" exactly as shown' 
              : ''
          }
          sx={{ mb: 2 }}
        />
      </DialogContent>
      
      <Divider />
      
      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button 
          onClick={handleClose} 
          disabled={loading}
          startIcon={<CancelIcon />}
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={loading || confirmation !== 'DELETE'}
          startIcon={loading ? <CircularProgress size={16} /> : <DeleteIcon />}
          sx={{ minWidth: 140 }}
        >
          {loading ? 'Deleting...' : 'Delete Account'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountDialog;
