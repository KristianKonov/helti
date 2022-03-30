import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import FoodDetails from '../food_details';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';

const FoodCard = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false)
    };
    const handleToggle = () => {
        setOpen(!open);
    }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={props.name}
        height="140"
        image="https://i.imgur.com/kqOj5QG.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
            <li>Калории: {Math.round((props.calories + Number.EPSILON) * 100) / 100}</li>
            <li>Протеин: {Math.round((props.protein + Number.EPSILON) * 100) / 100}</li>
            <li>Въглехидрати: {Math.round((props.carbs + Number.EPSILON) * 100) / 100}</li>
            <li>Мазнини: {Math.round((props.fats + Number.EPSILON) * 100) / 100}</li>
        <Typography variant="body2" color="text.secondary">
          Количеството което трябва да приемете е: <b>{props.amount}</b>
        </Typography>
        <CardActions>
        <Button key={props.id} onClick={handleToggle} fullWidth size="small">Повече информация</Button>
        <div className="food-backdrop">
          <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
          >
              <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClose}>
                      <Grid item xs={12} md={10} lg={10}>
                          <Paper
                              sx={{
                                  p: 2,
                                  display: 'flex',
                                  flexDirection: 'column'
                              }}
                          >
                          <div className="food-backdrop-btn" onClick={handleClose}>
                            <CloseIcon />
                          </div>
                          <FoodDetails food={props} />
                          </Paper>
                      </Grid>
              </ClickAwayListener>
          </Backdrop>
        </div>
      </CardActions>
      </CardContent>
    </Card>
  );
}

export default FoodCard