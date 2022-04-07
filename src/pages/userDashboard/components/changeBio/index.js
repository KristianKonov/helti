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
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import './../../userDashboard.sass'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Helmet } from 'react-helmet-async';
import GoalsNomenclature from '../nomenclature/goals';
import FoodNomenclature from '../nomenclature/food';
import ActivityNomenclature from '../nomenclature/activity';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
      '.MuiFormControlLabel-label': checked && {
        color: theme.palette.primary.main,
      },
    }),
)

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
}))

  
const EditBiologicalData = () => {
    const userData = useContext(UserContext)
    const [age, setAge] = useState(null)
    const [progress, setProgress] = useState(0)
    const [goal, setGoal] = useState('')
    const [gender, setGender] = useState('')
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [foodHabits, setFoodHabits] = useState(3)
    const [activityHabits, setActivityHabits] = useState(2)

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
            setGoal(userData.userData.biologicalData.energyBalanceFactor.id)
            setActivityHabits(userData.userData.biologicalData.physicalActivityFactor.id)
            setWeight(userData.userData.biologicalData.measurement.weight)
            setFoodHabits(userData.userData.biologicalData.foodThermicEffect.id)
        }
    },[userData.userData.biologicalData])
        
    function GoalForm(props) {
        const radioGroup = useRadioGroup();
        
        let checked = false;
        
        if (radioGroup) {
            checked = radioGroup.value === props.value;
            console.log('here', radioGroup.value, ' ', goal)
        }
        
        return <StyledFormControlLabel checked={checked} {...props} />;
    }
    
    function GenderForm(props) {
        const radioGroup = useRadioGroup();
        
        let checked = false;
        
        if (radioGroup) {
            checked = radioGroup.value === props.value;
        }
        
        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    const ChangeMeasurement = () => {
        var dataMeasurement = JSON.stringify({
            "age": parseInt(age),
            "energyBalanceFactor": parseInt(goal),
            "foodThermicEffect": parseInt(foodHabits),
            "gender": gender,
            "height": parseInt(height),
            "physicalActivityFactor": parseInt(activityHabits),
            "weight": parseInt(weight)
        });

        var configMeasurement = {
            method: 'put',
            url: 'http://localhost:8080/api/user/update-biological-data',
            headers: { 
                'accept': '*/*', 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
            },
            data: dataMeasurement
        };

        axios(configMeasurement)
        .then(function (responseMeasurement) {
            console.log('RESPONSE', responseMeasurement)
            console.log('DATA', JSON.stringify(dataMeasurement))
            setProgress(100)
            var temp = responseMeasurement.data
            userData.setUserData(user => ({
                ...user,
                'biologicalData': { 
                    ...user.biologicalData,
                    'age': age,
                    'gender': gender,
                    'height': height,
                    'measurement': {...temp}
                },
                'measurements': [
                    ...user.measurements,
                    temp
                ]
            }))
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
            }, 1500);
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
            console.log('tuk e greshkata', error);
        });
    }

    return(
        <>
            <Helmet>
                <title>Промяна на биологични данни | Helti</title>
            </Helmet>
            <BorderLinearProgress variant="determinate" value={progress} />
            {progress === 0 && gender !== '' &&
                    <>
                        <div className="biological-form-info">
                            <p>Моля попълнете полетата.</p>
                        </div>
                        <div className="dashboard-input-wrapper">
                            <TextField type="number" color='primary' id="outlined-basic" value={age !== null ? age : ''} onChange={(e) => setAge(e.target.value)} label="Възраст" variant="outlined" />
                        </div>
                        <div className="dashboard-input-wrapper">
                            <TextField type="number" color='primary' id="outlined-basic" value={height !== null ? height : ''} onChange={(e) => setHeight(e.target.value)} label="Височина" variant="outlined" />
                        </div>
                        <div className="dashboard-input-wrapper">
                            <h3>Пол:</h3>
                            <RadioGroup onChange={(e) => setGender(e.target.value)} value={gender} name="use-radio-group">
                                <GenderForm value="MALE" label="Мъж" control={<Radio />} />
                                <GenderForm value="FEMALE" label="Жена" control={<Radio />} />
                            </RadioGroup>
                        </div>
                        <LoadingButton
                        disabled={height !== null && age !== null && gender !== '' ? false : true}
                        color="secondary"
                        onClick={() => setProgress(45)}
                        loading={loading}
                        loadingPosition="end"
                        endIcon={<ArrowRightIcon />}
                        variant="contained"
                        >
                        Продължи
                        </LoadingButton>
                    </>
                }
                {
                progress === 45 &&
                    <div>
                        <div className="biological-form-info">
                            <h3>Въведете теглото си</h3>
                            <p>Спрямо настоящо</p>
                        </div>
                        <div className="dashboard-input-wrapper">
                            <TextField type="number" color='primary' id="outlined-basic" value={weight !== null ? weight : ''} onChange={(e) => setWeight(e.target.value)} label="Тегло" variant="outlined" />
                        </div>
                        <LoadingButton
                        disabled={weight !== null && weight !== '' ? false : true}
                        color="secondary"
                        onClick={() => setProgress(60)}
                        loading={loading}
                        loadingPosition="end"
                        endIcon={<ArrowRightIcon />}
                        variant="contained"
                        >
                        Продължи
                        </LoadingButton>
                    </div>
                }
                {progress === 60 &&
                    <>
                        <div className="biological-form-info">
                            <h3>Какви са целите ти?</h3>
                            <p>Спрямо целите се изчисляват макроси/ хранителни режими и т.н.</p>
                        </div>
                        <div className="dashboard-input-wrapper">
                        <GoalsNomenclature goal={goal} setGoal={setGoal} GoalForm={GoalForm} />
                        </div>
                        <LoadingButton
                        color="secondary"
                        onClick={() => setProgress(75)}
                        loading={loading}
                        loadingPosition="end"
                        endIcon={<ArrowRightIcon />}
                        variant="contained"
                        >
                        Продължи
                        </LoadingButton>
                    </>
                }
                {
                    progress === 75 &&
                    <div>
                        <div className="biological-form-info">
                            <h3>Как се храните?</h3>
                            <p>Оценете хранителните си навици използвайки slider-а по-долу</p>
                        </div>
                        <FoodNomenclature foodHabits={foodHabits} setFoodHabits={setFoodHabits} />
                        <LoadingButton
                        color="secondary"
                        onClick={() => setProgress(90)}
                        loading={loading}
                        loadingPosition="end"
                        endIcon={<ArrowRightIcon />}
                        variant="contained"
                        >
                        Продължи
                        </LoadingButton>
                    </div>
                }
                {
                    progress === 90 &&
                    <div>
                        <div className="biological-form-info">
                            <h3>Ниво на активност</h3>
                            <p>Въведете колко сте активни в ежедневието си.</p>
                        </div>
                        <ActivityNomenclature activityHabits={activityHabits} setActivityHabits={setActivityHabits} />
                        <LoadingButton
                        color="secondary"
                        onClick={ChangeMeasurement}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<AddIcon />}
                        variant="contained"
                        >
                        Добави
                        </LoadingButton>
                    </div>
                }
                {
                    progress === 100 &&
                    <div>
                        <div className="biological-form-info">
                            <h3>posted</h3>
                            <p>Въведете колко сте активни в ежедневието си.</p>
                        </div>
                    </div>
                }
        </>
    )
}

export default EditBiologicalData