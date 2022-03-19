import React, {useContext, useEffect, useState} from 'react'
import UserContext from '../../../../context'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Cookies from 'js-cookie'
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import axios from 'axios'
import { Stack } from '@mui/material';
import { Alert } from '@mui/material';
import './../../userDashboard.sass'

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
      '.MuiFormControlLabel-label': checked && {
        color: theme.palette.primary.main,
      },
    }),
  );

  
const EditBiologicalData = () => {
    const userData = useContext(UserContext)
    const [age, setAge] = useState(null)
    const [fatPercentage, setFatPercentage] = useState(null)
    const [goal, setGoal] = useState('')
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState({
        'status': false,
        'message': ''
    })
    const [error, setError] = useState({
        'status': false,
        'message': ''
    })
    console.log(userData)

    useEffect(() => {
        if(userData.userData?.biologicalData?.age) {
            setAge(userData.userData.biologicalData.age)
            setFatPercentage(userData.userData.biologicalData.fatPercentage)
            setHeight(userData.userData.biologicalData.height)
            setWeight(userData.userData.biologicalData.weight)
            setGoal(userData.userData.biologicalData.goal)
            console.log(userData.userData.biologicalData.goal)
        } else {
            console.log('hi')
        }
    },[userData.userData.biologicalData])
        
    function MyFormControlLabel(props) {
        const radioGroup = useRadioGroup();
        
        let checked = false;
        
        if (radioGroup) {
            checked = radioGroup.value === props.value;
            setGoal(radioGroup.value)
            console.log(goal)
        }
        
        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    const addBiologicalData = () => {
        if(weight === userData.userData?.biologicalData?.weight && height === userData.userData?.biologicalData?.height && goal === userData.userData?.biologicalData?.goal && fatPercentage === userData.userData?.biologicalData?.fatPercentage && age === userData.userData?.biologicalData?.age) {
            setError({
                'status': true,
                'message': "No changes found!"
            })
        } else {
            setLoading(true)
            var data = JSON.stringify({
                "age": age,
                "fatPercentage": fatPercentage,
                "goal": goal,
                "height": height,
                "weight": weight
                });
    
                var config = {
                method: 'post',
                url: 'http://localhost:8080/api/user/add-biological-data',
                headers: { 
                    'accept': '*/*', 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
                },
                data: data
                };
    
                axios(config)
                .then(function (response) {
                    setLoading(false)
                    setSuccess({
                        'status': true,
                        'message': 'Вие успешно добавихте биологичните си данни'
                    })
                    setError({
                        'status': false,
                        'message': ''
                    })
                })
                .catch(function (error) {
                    setLoading(false)
                    setError({
                        'status': true,
                        'message': 'Нещо се обърка!'
                    })
                    setSuccess({
                        'status': false,
                        'message': ''
                    })
                    console.log(error);
                });
        }
    }   

    return(
        <div>
            <h2>Добавяне на биологични данни</h2>
            <div>
                {error.status && 
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="outlined" severity="error">
                        {error.message}
                        </Alert>
                    </Stack>
                }
                {success.status && 
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="outlined" severity="success">
                        {success.message}
                        </Alert>
                    </Stack>
                }
            </div>
            {
                height !== null && weight !== null && fatPercentage !== null && age !== null ?
                <>
                    <div className="dashboard-input-wrapper">
                        <TextField type="number" color='primary' id="outlined-basic" value={age !== undefined ? age : ''} onChange={(e) => setAge(e.target.value)} label="Възраст" variant="outlined" />
                    </div>
                    <div className="dashboard-input-wrapper">
                        <TextField type="number" color='primary' id="outlined-basic" value={height !== undefined ? height : ''} onChange={(e) => setHeight(e.target.value)} label="Височина" variant="outlined" />
                    </div>
                    <div className="dashboard-input-wrapper">
                        <TextField type="number" color='primary' id="outlined-basic" value={weight !== undefined ? weight : ''} onChange={(e) => setWeight(e.target.value)} label="Тегло" variant="outlined" />
                    </div>
                    <div className="dashboard-input-wrapper">
                        <TextField type="number" color='primary' id="outlined-basic" value={fatPercentage !== undefined ? fatPercentage : ''} onChange={(e) => setFatPercentage(e.target.value)} label="% подкожни мазнини" variant="outlined" />
                    </div>
                    <div className="dashboard-input-wrapper">
                        <h3>Цел:</h3>
                        <RadioGroup name="use-radio-group" defaultValue={goal}>
                            <MyFormControlLabel value="CUT" label="Отслабване" control={<Radio />} />
                            <MyFormControlLabel value="BULK" label="Покачване на мускулна маса" control={<Radio />} />
                        </RadioGroup>
                    </div>
                    <LoadingButton
                    color="secondary"
                    onClick={addBiologicalData}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<AddIcon />}
                    variant="contained"
                    >
                    Добави
                    </LoadingButton>
                </>
                : "Loading..."
            }
            
        </div>
    )
}

export default EditBiologicalData