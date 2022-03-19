import * as React from 'react';
import { Link } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BarChartIcon from '@mui/icons-material/BarChart';

// Icons
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export const userDashboardPrimary = (
  <React.Fragment>
    <Link to='/dashboard'>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to='/dashboard/meal-generator'>
      <ListItemButton>
        <ListItemIcon>
          <RestaurantIcon />
        </ListItemIcon>
        <ListItemText primary="Meal generator" />
      </ListItemButton>
    </Link>
    <Link to='/dashboard/trainers'>
      <ListItemButton>
        <ListItemIcon>
          <FitnessCenterIcon />
        </ListItemIcon>
        <ListItemText primary="Hire a personal trainer" />
      </ListItemButton>
    </Link>
    <Link to='/dashboard/reports'>
        <ListItemButton>
        <ListItemIcon>
            <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
        </ListItemButton>
    </Link>
  </React.Fragment>
);

export const userDashboardSecondary = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Account settings
    </ListSubheader>
    <Link to='/dashboard/settings/changename'>
        <ListItemButton>
        <ListItemIcon>
            <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Change name" />
        </ListItemButton>
    </Link>
    <Link to='/dashboard/settings/changeemail'>
        <ListItemButton>
        <ListItemIcon>
            <AlternateEmailIcon />
        </ListItemIcon>
        <ListItemText primary="Change email" />
        </ListItemButton>
    </Link>
    <Link to='/dashboard/settings/changebiodata'>
        <ListItemButton>
        <ListItemIcon>
            <HealthAndSafetyIcon />
        </ListItemIcon>
        <ListItemText primary="Change biological data" />
        </ListItemButton>
    </Link>
  </React.Fragment>
);
