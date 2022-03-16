import Title from './../Title';
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import './createfood.sass'


const CreateFood = () => {
    const [name, setName] = useState('')
    const [calories, setCalories] = useState(0)
    const [carbs, setCarbs] = useState(0)
    const [protein, setProtein] = useState(0)
    const [fats, setFats] = useState(0)

    const [success, setSuccess] = useState({
        'status': false,
        'message': ''
    })

    const createFoodHandler = (e) => {
        e.preventDefault()
        var axios = require('axios');
        var data = JSON.stringify({
                "calories": calories,
                "carbs": carbs,
                "fats": fats,
                "name": name,
                "protein": protein
            });

            var config = {
                method: 'post',
                url: 'http://localhost:8080/api/foods/create',
                headers: { 
                    'accept': '*/*', 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
                },
                data: data
            };

            axios(config)
            .then(function (response) {
                setSuccess({'status': true, 'message': "Successfully added "+name+" to the DB!"})
            })
            .catch(function (error) {
                console.log(error);
        });

    }

    return(
        <div className="create-food">
            <Title>Create Food</Title>
            <div>
                {success.status && 
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="outlined" severity="success">
                        {success.message}
                        </Alert>
                    </Stack>
                }
                <form onSubmit={createFoodHandler}>
                    <div>
                        <label>
                            Name:
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Calories:
                            <input type="text" value={calories} onChange={(e) => setCalories(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Protein:
                            <input type="text" value={protein} onChange={(e) => setProtein(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Carbs:
                            <input type="text" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Fats:
                            <input type="text" value={fats} onChange={(e) => setFats(e.target.value)} />
                        </label>
                    </div>
                    <div className="submit-btn">
                        <Button type="submit" variant="contained" endIcon={<AddIcon />}>
                            Create food
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateFood