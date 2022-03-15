import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios'

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [loaded, setLoaded] = useState(false)
  const [users, setUsers] = useState([{}])
  var recentUsers = users.slice((users.length-5),(users.length))
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://localhost:8080/api/admin/all',
      headers: { 
          'accept': '*/*', 
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlckBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwiaWF0IjoxNjQ2OTQ3MDgzLCJleHAiOjE2NDgwODAwMDB9.veK6HF-RavyY-iIe99qaIO5bmBMx1RTt05VTqKRhwE18cadtZOZM4yyCapvChn3BMI_kBvUmq4Hi2-CjB1YmCw'
      }
    }
    axios(config).then(response => {
      setUsers(response.data)
      setLoaded(true)
    }).catch(error => {
      console.log(error.message)
    })
  },[])

  return (
    <React.Fragment>
      <Title>Recent Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          loaded ? 
          recentUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstName + ' ' + user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.appUserRole}</TableCell>
            </TableRow>
          )) :
          'Loading...'
          }
        </TableBody>
      </Table>
      <div className="box">
        <Link to='/admin/users'>
          See more users
        </Link>
      </div>
    </React.Fragment>
  );
}
