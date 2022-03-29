import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
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
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
      '.MuiFormControlLabel-label': checked && {
        color: theme.palette.primary.main,
      },
    }),
  );

  
  const AddBiologicalData = () => {
        const userData = useContext(UserContext)
        const [age, setAge] = useState(null)
        const [progress, setProgress] = useState(0)
        //   const [goal, setGoal] = useState('')
        //   const [gender, setGender] = useState('')
        let goal = ''
        let gender = ''
        const [height, setHeight] = useState(null)
        const [weight, setWeight] = useState(null)
        const [loading, setLoading] = useState(false)
        const navigate = useNavigate()
        const [success, setSuccess] = useState({
          'status': false,
          'message': ''
        })
      const [info, setInfo] = useState({
          'status': false,
          'message': ''
        })
        const [error, setError] = useState({
            'status': false,
            'message': ''
        })
    function GoalForm(props) {
        const radioGroup = useRadioGroup();
        
        let checked = false;
        
        if (radioGroup && radioGroup.value !== undefined) {
            checked = radioGroup.value === props.value;
            // setGoal(radioGroup.value)
            goal = radioGroup.value
        }
        
        return <StyledFormControlLabel checked={checked} {...props} />;
    }
    
    function GenderForm(props) {
        const radioGroup = useRadioGroup();
        
        let checked = false;
        
        if (radioGroup && radioGroup.value !== undefined) {
            checked = radioGroup.value === props.value;
            // setGender(radioGroup.value)
            gender = radioGroup.value
        }
        
        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    useEffect(() => {
        console.log('updated ', userData.userData)
    },[userData.userData])

    const addBiologicalData = () => {
        if(height === null && goal === '' && age === null) {
            setError({
                'status': true,
                'message': "No changes found!"
            })
        } else { 
            setLoading(true)

            var data = JSON.stringify({
            "age": age,
            "gender": gender,
            "goal": goal,
            "height": height
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
                console.log('bio', response)
                userData.setUserData({
                    'id': response.data.id,
                    'email': response.data.email,
                    'role': response.data.role,
                    'firstName': response.data.firstName,
                    'lastName': response.data.lastName,
                    'biologicalData': response.data.biologicalDataVersion,
                    'measurements': response.data.measurements
                })
                setProgress(50)
                setInfo({
                    'status': true,
                    'message': 'Вие успешно добавихте биологичните си данни. Добавете теглото си за да продължите към Helti!'
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
                console.log('meas', responseMeasurement)
                var temp = responseMeasurement.data
                userData.setUserData(user => ({
                    ...user,
                    'biologicalData': {
                        ...user.biologicalData,
                        'measurement': {...temp}
                    },
                    'measurements': [
                        ...user.measurements,
                        temp
                    ]
                }))
                setLoading(false)
                setProgress(100)
                setSuccess({
                    'status': true,
                    'message': 'Вие успешно добавихте биологичните данни и теглото си! Ще бъдете пренасочени!'
                })
                setError({
                    'status': false,
                    'message': ''
                })
                setInfo({
                    'status': false,
                    'message': ''
                })
                setTimeout(function() {
                    navigate('/dashboard')
                }, 2000);
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
            <BorderLinearProgress variant="determinate" value={progress} />
            <div className="status-body">
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
                {info.status &&
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="outlined" severity="info">
                            {info.message}
                        </Alert>
                    </Stack>
                }
            </div>
                {progress === 0 ?
                <>
                    <div className="dashboard-input-wrapper">
                        <TextField type="number" color='primary' id="outlined-basic" value={age !== null ? age : ''} onChange={(e) => setAge(e.target.value)} label="Възраст" variant="outlined" />
                    </div>
                    <div className="dashboard-input-wrapper">
                        <TextField type="number" color='primary' id="outlined-basic" value={height !== null ? height : ''} onChange={(e) => setHeight(e.target.value)} label="Височина" variant="outlined" />
                    </div>
                    <div className="dashboard-input-wrapper">
                        <h3>Пол:</h3>
                        <RadioGroup name="use-radio-group">
                            <GenderForm value="MALE" label="Мъж" control={<Radio />} />
                            <GenderForm value="FEMALE" label="Жена" control={<Radio />} />
                        </RadioGroup>
                    </div>
                    <div className="dashboard-input-wrapper">
                        <h3>Цел:</h3>
                        <RadioGroup name="use-radio-group">
                            <GoalForm value="CUT" label="Отслабване" control={<Radio />} />
                            <GoalForm value="BULK" label="Покачване на мускулна маса" control={<Radio />} />
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
                :
                <div>
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
                    Добави
                    </LoadingButton>
                </div>
            }
        </div>
    )
}

export default AddBiologicalData