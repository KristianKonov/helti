import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Title from './Title';
import './users.sass'
import axios from 'axios'

const UserDashboard = () => {
    const [loaded, setLoaded] = useState(false)
    const [users, setUsers] = useState([{}])
    const [editFlag, setEditFlag] = useState(false)
    const [editUser, setEditUser] = useState({})
    let userId = null
    
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
        }).then(setLoaded(true)).catch(error => {
            console.log(error.message)
        })
    },[])

    const deleteUser = () => {
        var config = {
            method: 'delete',
            url: 'http://localhost:8080/api/admin/delete/'+userId,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlckBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwiaWF0IjoxNjQ2OTQ3MDgzLCJleHAiOjE2NDgwODAwMDB9.veK6HF-RavyY-iIe99qaIO5bmBMx1RTt05VTqKRhwE18cadtZOZM4yyCapvChn3BMI_kBvUmq4Hi2-CjB1YmCw'
            }
        }
        axios(config).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.message)
        })
    }

    const handleDelete = async () => {
        if(loaded) {
            deleteUser()
        }
    }

    const editRequest = () => {
        var config = {
            method: 'put',
            url: 'http://localhost:8080/api/admin/update/'+userId,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlckBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwiaWF0IjoxNjQ2OTQ3MDgzLCJleHAiOjE2NDgwODAwMDB9.veK6HF-RavyY-iIe99qaIO5bmBMx1RTt05VTqKRhwE18cadtZOZM4yyCapvChn3BMI_kBvUmq4Hi2-CjB1YmCw'
            },
            data: {
                'email': '',
                'firstName': '',
                'id': '',
                'lastName': '',
                'password': ''
            }
        }
        axios(config).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.message)
        })
    }

    const EditForm = () => {
        console.log('editForm func ', editUser)
        return (
            <div className="edit-form">
                <Title>Edit User:</Title>
                <form>
                    <input />
                </form>
            </div>
        )
    }

    const handleEdit = () => {
        setEditFlag(!editFlag)
    }

    return(
        <React.Fragment>
            <Title>Recent Users</Title>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {
                loaded && 
                users.map((user, index) => (
                    <TableRow key={index}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.firstName + ' ' + user.lastName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.appUserRole}</TableCell>
                        <TableCell><EditIcon onClick={() => {setEditUser(user); handleEdit()}} key={user.email} fontSize="inherit" /></TableCell>
                        <TableCell><DeleteIcon onClick={() => {userId = user.id; handleDelete()}} key={user.email} fontSize="inherit" /></TableCell>
                    </TableRow>
                ))
                }
                </TableBody>
            </Table>
            {console.log('flag ', editFlag, ' other bs ', userId )}
            {editFlag && <EditForm />}
        </React.Fragment>
    )
}

export default UserDashboard