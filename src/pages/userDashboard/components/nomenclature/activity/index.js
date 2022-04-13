import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import Slider from '@mui/material/Slider';

const ActivityNomenclature = (props) => {
    const [activity, setActivity] = useState(null)
    useEffect(() => {
        var config = {
        method: 'get',
        url: 'http://localhost:8080/api/nomenclature/physical-activity-factor',
            headers: { 
                'accept': '*/*', 
                'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
            }
        };

        axios(config)
        .then(function (response) {
            setActivity(
                response.data.map(  item => { 
                    return {item, value: parseInt(item.id) , label: item.name}
                })
            )
        })
        .catch(function (error) {
            console.log(error);
        });
    },[])

    if(activity !== null) {
        return(
            <>
                <div className="dashboard-form-slider">
                    <Slider
                        aria-label="Custom marks"
                        min={1}
                        max={4}
                        onChange={(e) => props.setActivityHabits(e.target.value)}
                        value={props.activityHabits}
                        step={1}
                        marks={activity}
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

export default ActivityNomenclature