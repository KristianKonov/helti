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
        alt="green iguana"
        height="140"
        image="https://i.imgur.com/kqOj5QG.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
            <li>Калории: {props.calories}</li>
            <li>Протеин: {props.protein}</li>
            <li>Въглехидрати: {props.carbs}</li>
            <li>Мазнини: {props.fats}</li>
        <Typography variant="body2" color="text.secondary">
          Количеството което трябва да приемете е: <b>{props.amount}</b>
        </Typography>
        <CardActions>
        <Button key={props.id} onClick={handleToggle} fullWidth size="small">Повече информация</Button>
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
                        <FoodDetails food={props} />
                        </Paper>
                    </Grid>
            </ClickAwayListener>
        </Backdrop>
      </CardActions>
      </CardContent>
    </Card>
  );
}

export default FoodCard