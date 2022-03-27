import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Cookies from 'js-cookie'
import Title from './Title';
import axios from 'axios'

export default function RecentUsers() {
  const [loaded, setLoaded] = useState(false)
  const [users, setUsers] = useState([{}])
  var recentUsers = users.slice((users.length-5),(users.length))
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://localhost:8080/api/admin/all',
      headers: { 
          'accept': '*/*', 
          'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
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
              <TableCell>{user.role}</TableCell>
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
