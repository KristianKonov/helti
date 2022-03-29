import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Divider } from '@mui/material';

// Icons
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PasswordIcon from '@mui/icons-material/Password';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

  const UserDashboardNavigation = () => {
    const [navToggle, setNavToggle] = useState(false)
    const location = useLocation()
  
    const navHandler = () => {
      setNavToggle(!navToggle)
    }

    return(
      <>
        <button className={navToggle ? "dashboard-nav-btn rotate" : "dashboard-nav-btn" } onClick={navHandler}>
          <ArrowBackIosIcon />
        </button>
        <div className={navToggle ? "user-mobile-nav" : "user-mobile-hidden"}>
          <div>
            <React.Fragment>
              <Link onClick={() => setNavToggle(false)} to='/dashboard'>
                <ListItemButton selected={location.pathname === '/dashboard' ? true : false}>
                  <ListItemIcon>
                    <DashboardIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </Link>
              <Link onClick={() => setNavToggle(false)} to='/dashboard/meal-generator'>
                <ListItemButton selected={location.pathname === '/dashboard/meal-generator' ? true : false}>
                  <ListItemIcon>
                    <RestaurantIcon />
                  </ListItemIcon>
                  <ListItemText primary="Meal generator" />
                </ListItemButton>
              </Link>
              {/* <Link to='/dashboard/trainers'> */}
                <ListItemButton disabled>
                  <ListItemIcon>
                    <FitnessCenterIcon />
                  </ListItemIcon>
                  <ListItemText primary="Hire a personal trainer" />
                </ListItemButton>
              {/* </Link> */}
              {/* <Link to='/dashboard/reports'> */}
                  <ListItemButton disabled>
                  <ListItemIcon>
                      <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reports" />
                  </ListItemButton>
              {/* </Link> */}
          </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
              <ListSubheader component="div" inset>
                Account settings
              </ListSubheader>
              <Link onClick={() => setNavToggle(false)} to='/dashboard/settings/changename'>
                  <ListItemButton selected={location.pathname === '/dashboard/settings/changename' ? true : false}>
                  <ListItemIcon>
                      <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Change name" />
                  </ListItemButton>
              </Link>
              <Link onClick={() => setNavToggle(false)} to='/dashboard/settings/changepassword'>
                  <ListItemButton selected={location.pathname === '/dashboard/settings/changepassword' ? true : false}>
                  <ListItemIcon>
                      <PasswordIcon />
                  </ListItemIcon>
                  <ListItemText primary="Change password" />
                  </ListItemButton>
              </Link>
              {/* <Link to='/dashboard/settings/changeemail'> */}
                  <ListItemButton disabled>
                  <ListItemIcon>
                      <AlternateEmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Change email" />
                  </ListItemButton>
              {/* </Link> */}
              <Link onClick={() => setNavToggle(false)} to='/dashboard/settings/changebiodata'>
                  <ListItemButton selected={location.pathname === '/dashboard/settings/changebiodata' ? true : false}>
                  <ListItemIcon>
                      <HealthAndSafetyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Change biological data" />
                  </ListItemButton>
              </Link>
              <Link onClick={() => setNavToggle(false)} to='/dashboard/settings/deactivate'>
                  <ListItemButton selected={location.pathname === '/dashboard/settings/deactivate' ? true : false}>
                  <ListItemIcon>
                      <HealthAndSafetyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Deactivate account" />
                  </ListItemButton>
              </Link>
          </React.Fragment>
          </div>
        </div>
      </>

    )
  }

export default UserDashboardNavigation