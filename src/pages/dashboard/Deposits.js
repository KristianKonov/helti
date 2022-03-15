import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios'
import './dashboard.sass'

function preventDefault(event) {
  event.preventDefault();
}


export default function Deposits() {
  useEffect(() => {
    axios.get('http://localhost:8080/').then(response=> {
      setUserCount(response.data.registeredUsersNumber)
      setFoodsCount(response.data.foodsNumber)
    }).catch(err => {
      console.log(err.message)
    })
  },[])
  const [userCount, setUserCount] = useState(null)
  const [foodsCount, setFoodsCount] = useState(null)
  return (
    <React.Fragment>
      <Title>Helti Users</Title>
      <Typography component="p" variant="h4">
        {userCount}
      </Typography>
      <div className="box">
        <Link to='users'>
            View all users
        </Link>
      </div>
      <Title>Foods in database</Title>
      <Typography component="p" variant="h4">
        {foodsCount}
      </Typography>
      <div className="box">
        <Link to='foods'>
            View all foods
        </Link>
      </div>
    </React.Fragment>
  );
}
