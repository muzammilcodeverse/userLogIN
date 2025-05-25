import { useState, useEffect } from 'react';
import { getUsers } from '../utils/api';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
import { Person as PersonIcon, Search as SearchIcon } from '@mui/icons-material';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users...');
        const response = await getUsers();
        console.log('API response:', response);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to generate random colors for avatars
  const getRandomColor = (name) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      '#FF5722',
      '#9C27B0',
      '#3F51B5',
      '#009688',
    ];
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading users...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight={700} sx={{ mb: 1 }}>
          Registered Users
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse all registered users on PulseID
        </Typography>
      </Box>

      {users.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
            border: '1px dashed #e0e0e0',
          }}
        >
          <SearchIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No users found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Be the first to register on our platform!
          </Typography>
        </Paper>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid #f0f0f0',
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Joined</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          bgcolor: getRandomColor(user.name),
                          width: 36,
                          height: 36,
                          mr: 2,
                        }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body1" fontWeight={500}>
                        {user.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label="Active"
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        color: theme.palette.secondary.main,
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default UsersList;
