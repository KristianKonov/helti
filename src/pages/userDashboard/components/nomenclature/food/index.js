import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import Slider from '@mui/material/Slider';

const FoodNomenclature = (props) => {
    const [food, setFood] = useState(null)
    useEffect(() => {
        var config = {
        method: 'get',
        url: 'http://localhost:8080/api/nomenclature/food-thermic-effect',
            headers: { 
                'accept': '*/*', 
                'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
            }
        };

        axios(config)
        .then(function (response) {
            setFood(
                response.data.map(  item => { 
                    return {item, value: parseInt(item.id) , label: item.name}
                })
            )
        })
        .catch(function (error) {
        console.log(error);
        });
        
    },[])
    
    if(food !== null) {
        return(
            <>
                <div className="dashboard-form-slider">
                    <Slider
                        aria-label="Custom marks"
                        min={1}
                        max={4}
                        onChange={(e) => props.setFoodHabits(e.target.value)}
                        value={props.foodHabits}
                        step={1}
                        marks={food}
                    />
                </div>
            </>
        )
    } else {
        return(
            <div>
                Loading...
            </div>
        )
    }
}

export default FoodNomenclature