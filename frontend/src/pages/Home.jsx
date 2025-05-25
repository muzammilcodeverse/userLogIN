import { useAuth } from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  useTheme,
} from '@mui/material';
import { PersonAdd, Login, People } from '@mui/icons-material';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Welcome to Pulse<Box component="span" sx={{ color: theme.palette.secondary.main, fontWeight: 900 }}>ID</Box>
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              Secure identity management for the modern digital world
            </Typography>

            {isAuthenticated ? (
              <Box>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Hello, {user?.name}!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  You are successfully logged in. Explore the platform and manage your account.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/users"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<People />}
                  sx={{ mr: 2 }}
                >
                  View All Users
                </Button>
                <Button
                  component={RouterLink}
                  to="/profile"
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  My Profile
                </Button>
              </Box>
            ) : (
              <Stack direction="row" spacing={2}>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<PersonAdd />}
                >
                  Sign Up
                </Button>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<Login />}
                >
                  Login
                </Button>
              </Stack>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                backgroundColor: theme.palette.primary.main,
                width: '100%',
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.1,
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                }}
              />
              <Typography
                variant="h3"
                component="div"
                align="center"
                sx={{ color: 'white', fontWeight: 700, mb: 2, zIndex: 1 }}
              >
                Identity Simplified
              </Typography>
              <Typography
                variant="h6"
                align="center"
                sx={{ color: 'white', opacity: 0.9, maxWidth: '80%', zIndex: 1 }}
              >
                Powerful authentication, seamless user management, and robust security in one elegant platform
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
