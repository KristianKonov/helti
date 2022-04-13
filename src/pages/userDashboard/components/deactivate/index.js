import React, { useState, useEffect } from 'react'
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import axios from 'axios'
import Cookies from 'js-cookie'
import { Helmet } from 'react-helmet-async';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
      '.MuiFormControlLabel-label': checked && {
        color: theme.palette.primary.main,
      },
    }),
  );

const DeactivateAccountPage = () => {
    const [reasonsList, SetReasonsList] = useState(null)
    const [reason, setReason] = useState(null)
    function MyFormControlLabel(props) {
        const radioGroup = useRadioGroup();
        
        let checked = false;
        
        if (radioGroup && radioGroup.value !== undefined) {
            checked = parseInt(radioGroup.value) === props.value;
        }
        
        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    useEffect(() => {
        // GET REASONS
        var config = {
            method: 'get',
            url: 'http://localhost:8080/api/nomenclature/account-deactivation-reasons',
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
            }
        }
        axios(config)
        .then(function (response) {
            SetReasonsList(
                response.data
            )
        })
        .catch(function (error) {
            console.log(error)
        })
    },[])

    const deactivateUser = () => {
        var config = {
            method: 'put',
            url: 'http://localhost:8080/api/user/disable',
            headers: { 
                'accept': '*/*',
                'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
            },
            data: {
                'deactivateReasonId': parseInt(reason)
            }
        };

        axios(config)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return(
        <div className="dashboard-deactivate">
            <Helmet>
                <title>
                    Деактивиране | Helti
                </title>
            </Helmet>
            <h3>Сигурни ли сте че искате да деактивирате акаунта си?</h3>
            <RadioGroup onChange={(e) => setReason(e.target.value)} name="use-radio-group">
                {
                    reasonsList !== null && reasonsList.length > 1 ? 
                    reasonsList.map((item, index) => {
                        return (
                            <div key={index}>
                                <MyFormControlLabel key={item.name} value={item.id} label={item.name} control={<Radio />} />
                            </div>
                        )
                    })
                    :
                    'Loading reasons'
                }
            </RadioGroup>
            <Button disabled={reason !== '' ? false : true} onClick={deactivateUser} variant="contained" endIcon={<DeleteIcon />}>
                Деактивирай
            </Button>
        </div>
    )
}

export default DeactivateAccountPage