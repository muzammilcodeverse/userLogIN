import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import EditProfileDialog from '../components/EditProfileDialog';
import DeleteAccountDialog from '../components/DeleteAccountDialog';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  useTheme,
  Tab,
  Tabs,
  Alert,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarMonth as CalendarIcon,
  Edit as EditIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// TabPanel component for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditSuccess = () => {
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 5000);
  };

  const handleEditProfile = () => {
    setEditDialogOpen(true);
  };

  const handleDeleteAccount = () => {
    setDeleteDialogOpen(true);
  };

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading profile...
        </Typography>
      </Container>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Profile Header */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          mb: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          color: 'white',
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
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'white',
                color: theme.palette.primary.main,
                fontSize: '2.5rem',
                fontWeight: 'bold',
                border: '4px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {getInitials(user.name)}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 1, zIndex: 1, position: 'relative' }}>
              {user.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, zIndex: 1, position: 'relative' }}>
              <Chip
                icon={<EmailIcon sx={{ color: 'white !important' }} />}
                label={user.email}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  '& .MuiChip-icon': { color: 'white' },
                }}
              />
              <Chip
                icon={<CalendarIcon sx={{ color: 'white !important' }} />}
                label={`Joined ${formatDate(user.createdAt)}`}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  '& .MuiChip-icon': { color: 'white' },
                }}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEditProfile}
                sx={{
                  bgcolor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteAccount}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Success Alert */}
      {updateSuccess && (
        <Alert severity="success" sx={{ mb: 4 }}>
          Profile updated successfully!
        </Alert>
      )}

      {/* Profile Content */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          {/* Profile Info Card */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid #f0f0f0',
              mb: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Profile Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Full Name
                </Typography>
                <Typography variant="body1">{user.name}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email Address
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Member Since
                </Typography>
                <Typography variant="body1">{formatDate(user.createdAt)}</Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Account Status Card */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid #f0f0f0',
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Account Status
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">Account Status</Typography>
                <Chip
                  label="Active"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(16, 185, 129, 0.1)',
                    color: theme.palette.secondary.main,
                    fontWeight: 500,
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body1">Email Verified</Typography>
                <Chip
                  label="Verified"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid #f0f0f0',
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
                <Tab
                  icon={<PersonIcon />}
                  iconPosition="start"
                  label="Overview"
                  id="profile-tab-0"
                  aria-controls="profile-tabpanel-0"
                />
                <Tab
                  icon={<SecurityIcon />}
                  iconPosition="start"
                  label="Security"
                  id="profile-tab-1"
                  aria-controls="profile-tabpanel-1"
                />
                <Tab
                  icon={<NotificationsIcon />}
                  iconPosition="start"
                  label="Notifications"
                  id="profile-tab-2"
                  aria-controls="profile-tabpanel-2"
                />
              </Tabs>
            </Box>

            <CardContent>
              <TabPanel value={tabValue} index={0}>
                <Typography variant="h6" gutterBottom>
                  Welcome to your profile, {user.name}!
                </Typography>
                <Typography variant="body1" paragraph>
                  This is your personal PulseID profile where you can view and manage your account information.
                  Your account was created on {formatDate(user.createdAt)}.
                </Typography>
                <Typography variant="body1">
                  From here, you can:
                </Typography>
                <ul>
                  <li>Update your personal information</li>
                  <li>Change your password</li>
                  <li>Manage notification preferences</li>
                  <li>View your account activity</li>
                </ul>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>
                  Security Settings
                </Typography>
                <Typography variant="body1" paragraph>
                  Manage your account security settings here. We recommend regularly updating your password
                  and enabling two-factor authentication for enhanced security.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
                    Change Password
                  </Button>
                  <Button variant="outlined" color="primary">
                    Enable 2FA
                  </Button>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  Notification Preferences
                </Typography>
                <Typography variant="body1" paragraph>
                  Manage how you receive notifications from our platform. You can customize your preferences
                  for email notifications, system alerts, and more.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Button variant="outlined" color="primary">
                    Update Preferences
                  </Button>
                </Box>
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSuccess={handleEditSuccess}
      />

      {/* Delete Account Dialog */}
      <DeleteAccountDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </Container>
  );
};

export default Profile;
