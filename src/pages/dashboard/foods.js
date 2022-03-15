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
import axios from 'axios'
import './foods.sass'

const FoodDashboard = () => {
    const [loaded, setLoaded] = useState(false)
    const [foods, setFoods] = useState([{}])
    const [editFood, setEditFood] = useState({})
    const [editFlag, setEditFlag] = useState(false)
    const [editLoaded, setEditLoaded] = useState(false)
    // UPDATE FORM
    const [updateName, setUpdateName] = useState('')
    const [updateCalories, setUpdateCalories] = useState(0)
    const [updateProtein, setUpdateProtein] = useState(0)
    const [updateCarbs, setUpdateCarbs] = useState(0)
    const [updateFats, setUpdateFats] = useState(0)
    let foodId = null
    
    useEffect(() => {
        var config = {
            method: 'get',
            url: '/api/foods',
            headers: { 
                'accept': '*/*', 
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlckBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwiaWF0IjoxNjQ2OTQ3MDgzLCJleHAiOjE2NDgwODAwMDB9.veK6HF-RavyY-iIe99qaIO5bmBMx1RTt05VTqKRhwE18cadtZOZM4yyCapvChn3BMI_kBvUmq4Hi2-CjB1YmCw'
            }
        }
        axios(config).then(response => {
            setFoods(response.data)
        }).then(setLoaded(true)).catch(error => {
            console.log(error.message)
        })
    },[])

    const deleteFood = () => {
        var config = {
            method: 'delete',
            url: 'http://localhost:8080/api/foods/delete/'+foodId,
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
            deleteFood()
        }
    }

    useEffect(() => {
        setUpdateName(editFood.name)
        setUpdateCalories(editFood.calories)
        setUpdateProtein(editFood.protein)
        setUpdateCarbs(editFood.carbs)
        setUpdateFats(editFood.fats)
        setEditLoaded(true)
    },[editFood])

    const editToggle = () => {
        setEditFlag(!editFlag)
    }

    const editUserHandler = (e) => {
        e.preventDefault()
        var config = {
            method: 'put',
            url: 'http://localhost:8080/api/foods/update',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlckBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwiaWF0IjoxNjQ2OTQ3MDgzLCJleHAiOjE2NDgwODAwMDB9.veK6HF-RavyY-iIe99qaIO5bmBMx1RTt05VTqKRhwE18cadtZOZM4yyCapvChn3BMI_kBvUmq4Hi2-CjB1YmCw',
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            data: {
                'calories': updateCalories,
                'carbs': updateCarbs,
                'fats': updateFats,
                'id': editFood.id,
                'name': updateName,
                'protein': updateProtein
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
            <Title>All foods</Title>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Calories</TableCell>
                    <TableCell>Protein</TableCell>
                    <TableCell>Carbs</TableCell>
                    <TableCell>Fats</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {
                loaded && 
                foods.map((food, index) => (
                    <TableRow key={index}>
                    <TableCell>{food.id}</TableCell>
                    <TableCell>{food.name}</TableCell>
                    <TableCell>{food.calories}</TableCell>
                    <TableCell>{food.protein}</TableCell>
                    <TableCell>{food.carbs}</TableCell>
                    <TableCell>{food.fats}</TableCell>
                    <TableCell onClick={() => {setEditFood(food); editToggle()}} ><EditIcon key={food.name} fontSize="inherit" /></TableCell>
                    <TableCell onClick={() => {foodId = food.id; handleDelete()}}><DeleteIcon key={food.email} fontSize="inherit" /></TableCell>
                    </TableRow>
                ))
                }
                </TableBody>
            </Table>
            {editLoaded && editFood.name !== null && editFood.id !== null && updateFats !== null ?
            <div className={editFlag ? 'edit-form visible' : 'edit-form'}>
            <Title>Edit food:</Title>
            <form onSubmit={editUserHandler} >
                <div>
                    <label>
                        ID: 
                        <input readOnly value={editFood.id} />
                    </label>
                </div>
                <div>
                    <label>
                        Name: 
                        <input value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Calories: 
                        <input type='number' value={updateCalories} onChange={(e) => setUpdateCalories(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Protein: 
                        <input type='number' value={updateProtein} onChange={(e) => setUpdateProtein(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Carbs: 
                        <input type='number' value={updateCarbs} onChange={(e) => setUpdateCarbs(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Fats: 
                        <input type='number' value={updateFats} onChange={(e) => setUpdateFats(e.target.value)} />
                    </label>
                </div>
                <button className="update-btn" type="submit">Update</button>
            </form>
        </div>
        : 'Loading...'}
            
        </React.Fragment>
    )
}

export default FoodDashboard