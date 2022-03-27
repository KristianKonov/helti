import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './mealgenerator.sass'

// Radio imports
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';

// Foods Background
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// Button
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';

const MealGeneratorPage = () => {
    const [loading, setLoading] = useState(false)
    const [proteinFoods, setProteinFoods] = useState(null)
    const [carbFoods, setCarbFoods] = useState(null)
    const [fatFoods, setFatFoods] = useState(null)
    const [proteinFoodId, setProteinFoodId] = useState(null)
    const [carbFoodId, setCarbFoodId] = useState(null)
    const [fatFoodId, setFatFoodId] = useState(null)
    const [generated, setGenerated] = useState(false)
    const [generatorResponse, setGeneratorResponse] = useState(null)
    let proteinId = null
    let carbId = null
    let fatId = null

    const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
        ({ theme, checked }) => ({
            '.MuiFormControlLabel-label': checked && {
                color: theme.palette.primary.main,
            },
        }),
    );

    function ProteinFoodsRadioGroup(props) {
        const radioGroup = useRadioGroup();
        let checked = false;

        if (radioGroup && radioGroup.value !== undefined) {
            checked = radioGroup.value === props.value;
            // setProteinFoodId(radioGroup.value)
            proteinId = radioGroup.value
        }
        
        return <StyledFormControlLabel checked={checked} {...props} />;
    }
    
    function CarbFoodsRadioGroup(props) {
        const radioGroup = useRadioGroup();
        let checked = false;

        if (radioGroup && radioGroup.value !== undefined) {
            checked = radioGroup.value === props.value;
            // setCarbFoodId(radioGroup.value)
            carbId = radioGroup.value
        }
        
        return <StyledFormControlLabel checked={checked} {...props} />;
    }
    
    function FatFoodsRadioGroup(props) {
        const radioGroup = useRadioGroup();
        let checked = false;

        if (radioGroup && radioGroup.value !== undefined) {
            checked = radioGroup.value === props.value;
            // setFatFoodId(radioGroup.value)
            fatId = radioGroup.value
        }
        
        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    const submitFoods = () => {
        var config = {
            method: 'get',
            url: `http://localhost:8080/api/generation/meal?carbFoodId=${carbId}&fatFoodId=${fatId}&proteinFoodId=${proteinId}`,
            headers: { 
                'accept': '*/*', 
                'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
            }
        };

        axios(config)
        .then(function (response) {
            setGenerated(true)
            setGeneratorResponse(response.data)
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        // PROTEINS

        var configProtein = {
            method: 'get',
            url: 'http://localhost:8080/api/foods/protein-foods',
            headers: { 
                'accept': '*/*', 
                'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
            }
        };
    
        axios(configProtein)
        .then(function (responseProteins) {
            setProteinFoods(responseProteins.data)
        })
        .catch(function (error) {
            console.log(error);
        });

        // CARBS

        var configCarbs = {
            method: 'get',
            url: 'http://localhost:8080/api/foods/carb-foods',
            headers: { 
                'accept': '*/*', 
                'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
            }
        };

        axios(configCarbs)
        .then(function (responseCarbs) {
            setCarbFoods(responseCarbs.data)
        })
        .catch(function (error) {
            console.log(error);
        });

        // FAT FOODS

        var configFats = {
            method: 'get',
            url: 'http://localhost:8080/api/foods/fat-foods',
            headers: { 
                'accept': '*/*', 
                'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
            }
        };

        axios(configFats)
        .then(function (responseFats) {
            setFatFoods(responseFats.data)
        })
        .catch(function (error) {
            console.log(error);
        });


    },[])

    return(
        <div>
            {
                !generated ?
                <div>
                    <h2>Генерирай хранителен режим</h2>
                    <p>Избери по 1 храна от всеки вид!</p>
                    <div className="user-dashboard-food-types">
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4} lg={4}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <div>
                                    <h3>Протейнови храни:</h3>
                                    <RadioGroup name="protein-food">
                                        {proteinFoods !== null ? proteinFoods.slice(0,5).map((food, index) => {
                                            return <ProteinFoodsRadioGroup key={index} value={`${food.id}`} label={food.name} control={<Radio color="success" />} />
                                        }) : <h2>Loading</h2>}
                                    </RadioGroup>
                                </div>
                            </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <div>
                                        <h3>Въглехридратни храни:</h3>
                                        <RadioGroup name="carb-food">
                                            {carbFoods !== null ? carbFoods.slice(0,5).map((food, index) => {
                                                return <CarbFoodsRadioGroup key={index} value={`${food.id}`} label={food.name} control={<Radio color="success" />} />
                                            }) : <h2>Loading</h2>}
                                        </RadioGroup>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <div>
                                        <h3>Храни богати на мазнини:</h3>
                                        <RadioGroup name="fat-food">
                                            {fatFoods !== null ? fatFoods.slice(0,5).map((food, index) => {
                                                return <FatFoodsRadioGroup key={index} value={`${food.id}`} label={food.name} control={<Radio color="success" />} />
                                            }) : <h2>Loading</h2>}
                                        </RadioGroup>
                                    </div>
                                </Paper>
                            </Grid>
                                <LoadingButton
                                    color="secondary"
                                    onClick={submitFoods}
                                    loading={loading}
                                    loadingPosition="start"
                                    startIcon={<AddIcon />}
                                    variant="contained"
                                >
                                Добави
                                </LoadingButton>
                            </Grid>
                        </div>
                    </div>
            :
            generatorResponse === null ?
            <p>Loading...</p> :
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={5} lg={5}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                        <div className="target-macros">
                            <h2>Генерираната храна съдържа:</h2>
                            <ul>
                                <li>Калории: <span>{generatorResponse.targetMacros.calories}</span></li>
                                <li>Протейн: <span>{generatorResponse.targetMacros.protein}</span></li>
                                <li>Въглехидрати: <span>{generatorResponse.targetMacros.carbs}</span></li>
                                <li>Мазнини: <span>{generatorResponse.targetMacros.fats}</span></li>
                            </ul>
                        </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={5} lg={5}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                        <div className="current-macros">
                            <h2>Вашите препоръчителни макроси:</h2>
                            <ul>
                                <li>Калории: <span>{generatorResponse.currentMacros.calories}</span></li>
                                <li>Протейн: <span>{generatorResponse.currentMacros.protein}</span></li>
                                <li>Въглехидрати: <span>{generatorResponse.currentMacros.carbs}</span></li>
                                <li>Мазнини: <span>{generatorResponse.currentMacros.fats}</span></li>
                            </ul>
                    </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={10} lg={10}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                        <div className="generated-foods-body">
                        <h2>Вашите избрани храни и количеството, което трябва да приемете:</h2>
                        {generatorResponse.foods !== null ?
                            generatorResponse.foods.map((food, index) => {
                                console.log(food)
                                return(
                                        <div key={index} className="food-body">
                                            <img className="food-img" />
                                            <h3>{food.foodDetails.name}</h3>
                                            <ul>
                                                <li>Калории: <span>{food.foodDetails.calories}</span></li>
                                                <li>Протейн: <span>{food.foodDetails.protein}</span></li>
                                                <li>Въглехидрати: <span>{food.foodDetails.carbs}</span></li>
                                                <li>Мазнини: <span>{food.foodDetails.fats}</span></li>
                                            </ul>
                                            Количеството, което трябва да приемете е <b>{food.amount}</b>
                                        </div>
                                )
                                
                            })
                            : 'Loading...'
                        }
                        </div>  
                        
                        </Paper>
                    </Grid>                
                </Grid>
            </div>
            }
        </div>
    )
}

export default MealGeneratorPage