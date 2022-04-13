import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

const GoalsNomenclature = (props) => {
    const [reasons, setReasons] = useState(null)
    useEffect(() => {
        var config = {
        method: 'get',
        url: 'http://localhost:8080/api/nomenclature/energy_balance_factor',
            headers: { 
                'accept': '*/*', 
                'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
            }
        };
        axios(config)
        .then(function (response) {
            setReasons(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    },[])

    
    return(
        <RadioGroup value={String(props.goal)} onChange={(e) => props.setGoal(e.target.value)} name="use-radio-group">
        {
            reasons !== null ?
                reasons.map(reason => {
                    return (
                        <div key={reason.id}>
                            <props.GoalForm value={String(reason.id)} label={reason.name} control={<Radio />} />
                        </div>
                    )
                })
            : 'Loading...'
        }
        </RadioGroup>
    )
}

export default GoalsNomenclature