import React, {useContext, useEffect, useState} from 'react'
import UserContext from '../../../../context'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
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
    const [gender, setGender] = useState('')
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [success, setSuccess] = useState({
        'status': false,
        'message': ''
    })
    const [error, setError] = useState({
        'status': false,
        'message': ''
    })

    useEffect(() => {
        if(userData.userData?.biologicalData?.age) {
            setAge(userData.userData.biologicalData.age)
            setGender(userData.userData.biologicalData.gender)
            setHeight(userData.userData.biologicalData.height)
            setGoal(userData.userData.biologicalData.goal)
        }
    },[userData.userData.biologicalData])
        
    function GoalForm(props) {
        const radioGroup = useRadioGroup();
        
        let checked = false;
        
        if (radioGroup) {
            checked = radioGroup.value === props.value;
            setGoal(radioGroup.value)
        }
        
        return <StyledFormControlLabel checked={checked} {...props} />;
    }
    
    function GenderForm(props) {
        const radioGroup = useRadioGroup();
        
        let checked = false;
        
        if (radioGroup) {
            checked = radioGroup.value === props.value;
            setGender(radioGroup.value)
        }
        
        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    const AddMeasurement = () => {
        if(weight === null) {
            setError({
                'status': true,
                'message': 'Добави теглото си за да продължиш!'
            })
        } else {
            var dataMeasurement = JSON.stringify({
                "weight": weight
            });
    
            var configMeasurement = {
            method: 'post',
            url: 'http://localhost:8080/api/measurements/create',
            headers: { 
                'accept': '*/*', 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
            },
            data: dataMeasurement
            };
    
            axios(configMeasurement)
            .then(function (responseMeasurement) {
                setLoading(false)
                setSuccess({
                    'status': true,
                    'message': 'Вие успешно добавихте биологичните данни и теглото си! Ще бъдете пренасочени!'
                })
                setError({
                    'status': false,
                    'message': ''
                })
                setTimeout(function() {
                    navigate('/dashboard')
                }, 3000);
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
            <h2>Промяна на биологични данни</h2>
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
                userData.userData.biologicalData !== undefined && userData.userData.biologicalData !== null ?
                height !== null && age !== null ?
                <>
                    <div className="dashboard-input-wrapper">
                        <TextField type="number" color='primary' id="outlined-basic" value={weight !== null ? weight : ''} onChange={(e) => setWeight(e.target.value)} label="Тегло" variant="outlined" />
                    </div>
                    <LoadingButton
                    color="secondary"
                    onClick={AddMeasurement}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<AddIcon />}
                    variant="contained"
                    >
                    Промени
                    </LoadingButton>
                </>
                : "Loading..."
                : <p className="dashboard-noinfo">Все още нямате добавени биологични данни! <Link to='/dashboard/settings/addbiodata'>Добави сега!</Link></p>
            }
            
        </div>
    )
}

export default EditBiologicalData