import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './foodDetails.sass'

// Foods Background
import FoodTable from '../food_table';

const FoodDetails = (props) => (
        <div className="food-details-wrapper">
            <div className="food-details-left">
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="300"
                        image="https://i.imgur.com/kqOj5QG.jpg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {props.food.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <li>Калории: {props.food.calories}</li>
                            <li>Протеин: {props.food.protein}</li>
                            <li>Въглехидрати: {props.food.carbs}</li>
                            <li>Мазнини: {props.food.fats}</li>
                        </Typography>
                        <CardActions>
                    </CardActions>
                    </CardContent>
                </Card>
            </div>
            <div className="food-details-right">
                <FoodTable />
            </div>
        </div>          
)

export default FoodDetails