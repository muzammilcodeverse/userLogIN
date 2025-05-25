import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  useTheme,
  Badge,
  Tooltip,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 2 }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            fontWeight: 700,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={handleDrawerToggle}
        >
          <Box component="span" sx={{ color: theme.palette.primary.main }}>Pulse</Box>
          <Box component="span" sx={{ color: theme.palette.secondary.main, fontWeight: 900 }}>ID</Box>
        </Typography>
        <IconButton onClick={handleDrawerToggle} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/users"
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>
              <PeopleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        {isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/profile"
                onClick={handleDrawerToggle}
              >
                <ListItemIcon>
                  <AccountCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  logout();
                  handleDrawerToggle();
                }}
              >
                <ListItemIcon>
                  <LogoutIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/login"
                onClick={handleDrawerToggle}
              >
                <ListItemIcon>
                  <LoginIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/register"
                onClick={handleDrawerToggle}
              >
                <ListItemIcon>
                  <PersonAddIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          backgroundColor: 'white',
          borderBottom: '1px solid #E5E7EB',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h5"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 800,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Pulse<Box component="span" sx={{ color: theme.palette.secondary.main, fontWeight: 900 }}>ID</Box>
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  component={RouterLink}
                  to="/"
                  color="inherit"
                  startIcon={<HomeIcon />}
                  sx={{ mx: 1, fontWeight: 500 }}
                >
                  Home
                </Button>
                <Button
                  component={RouterLink}
                  to="/users"
                  color="inherit"
                  startIcon={<PeopleIcon />}
                  sx={{ mx: 1, fontWeight: 500 }}
                >
                  Users
                </Button>

                {isAuthenticated ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Notifications">
                      <IconButton color="inherit" sx={{ ml: 1 }}>
                        <Badge badgeContent={3} color="error">
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Account">
                      <IconButton
                        size="medium"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        sx={{ ml: 1 }}
                      >
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: theme.palette.primary.main,
                            border: '2px solid white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        >
                          {user?.name?.charAt(0).toUpperCase() || <PersonIcon />}
                        </Avatar>
                      </IconButton>
                    </Tooltip>

                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      PaperProps={{
                        elevation: 2,
                        sx: {
                          borderRadius: 2,
                          minWidth: 200,
                          mt: 1,
                          overflow: 'visible',
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                    >
                      <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {user?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user?.email}
                        </Typography>
                      </Box>
                      <Divider />
                      <MenuItem
                        component={RouterLink}
                        to="/profile"
                        onClick={handleClose}
                        sx={{ py: 1.5 }}
                      >
                        <ListItemIcon>
                          <AccountCircleIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        <Typography variant="body2">Profile</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={handleLogout}
                        sx={{ py: 1.5 }}
                      >
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" color="error" />
                        </ListItemIcon>
                        <Typography variant="body2">Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <>
                    <Button
                      component={RouterLink}
                      to="/login"
                      color="inherit"
                      startIcon={<LoginIcon />}
                      sx={{ mx: 1, fontWeight: 500 }}
                    >
                      Login
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/register"
                      variant="contained"
                      color="primary"
                      startIcon={<PersonAddIcon />}
                      sx={{ ml: 1 }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
