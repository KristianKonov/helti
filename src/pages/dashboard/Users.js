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
import Cookies from 'js-cookie'
import Title from './Title';
import './users.sass'
import axios from 'axios'

const UserDashboard = () => {
    const [loaded, setLoaded] = useState(false)
    const [users, setUsers] = useState([{}])
    const [editFlag, setEditFlag] = useState(false)
    const [editUser, setEditUser] = useState({})
    const [editLoaded, setEditLoaded] = useState(false)

    // UPDATE FORM

    const [updateFirstName, setUpdateFirstName] = useState('')
    const [updateLastName, setUpdateLastName] = useState('')
    const [updateEmail, setUpdateEmail] = useState('')
    const [updateRole, setUpdateRole] = useState('')
    const [updatePassword, setUpdatePassword] = useState('')

    let userId = null
    
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
        }).then(setLoaded(true)).catch(error => {
            console.log(error.message)
        })
    },[])

    const deleteUser = () => {
        var config = {
            method: 'delete',
            url: 'http://localhost:8080/api/admin/delete/'+userId,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
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

    useEffect(() => {
        setUpdateFirstName(editUser.firstName)
        setUpdateLastName(editUser.lastName)
        setUpdateEmail(editUser.email)
        setEditLoaded(true)
    },[editUser])

    const editToggle = () => {
        setEditFlag(!editFlag)
    }

    const editUserHandler = (e) => {
        e.preventDefault()
        var config = {
            method: 'put',
            url: 'http://localhost:8080/api/admin/update/',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('x-auth-token'),
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            data: {
                'email': updateEmail,
                'firstName': updateFirstName,
                'id': editUser.id,
                'lastName': updateLastName,
                'password': updatePassword
            }
        }
        axios(config).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.message)
        })
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
                        <TableCell><EditIcon onClick={() => {setEditUser(user); editToggle()}} key={user.email} fontSize="inherit" /></TableCell>
                        <TableCell><DeleteIcon onClick={() => {userId = user.id; handleDelete()}} key={user.email} fontSize="inherit" /></TableCell>
                    </TableRow>
                ))
                }
                </TableBody>
            </Table>
            {editUser && editUser.firstName !== null && editUser.id !== null && updateLastName !== null ?
            <div className={editFlag ? 'edit-form visible' : 'edit-form'}>
            <Title>Edit food:</Title>
            <form onSubmit={editUserHandler} >
                <div>
                    <label>
                        ID: 
                        <input readOnly value={editUser.id} />
                    </label>
                </div>
                <div>
                    <label>
                        First Name: 
                        <input type="text" value={updateFirstName} onChange={(e) => setUpdateFirstName(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Last Name: 
                        <input type='text' value={updateLastName} onChange={(e) => setUpdateLastName(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Email: 
                        <input type='text' value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Password: 
                        <input type='password' value={updatePassword} onChange={(e) => setUpdatePassword(e.target.value)} />
                    </label>
                </div>
                <button className="update-btn" type="submit">Update</button>
            </form>
        </div>
        : 'Loading...'}
        </React.Fragment>
    )
}

export default UserDashboard