import React, { useState, useContext } from 'react'
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import axios from 'axios'
import Cookies from 'js-cookie'
import UserContext from '../../../../context';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
      '.MuiFormControlLabel-label': checked && {
        color: theme.palette.primary.main,
      },
    }),
  );


const DeactivateAccountPage = () => {
    const userData = useContext(UserContext)
    const [reason, setReason] = useState('')
    function MyFormControlLabel(props) {
        const radioGroup = useRadioGroup();
        
        let checked = false;
        
        if (radioGroup) {
            checked = radioGroup.value === props.value;
            if(radioGroup.value) {
                setReason(radioGroup.value)
            }
        }
        
        return <StyledFormControlLabel checked={checked} {...props} />;
    }

    const deactivateUser = () => {
        var config = {
            method: 'put',
            url: 'http://localhost:8080/api/registration/deactivate',
            headers: { 
                'accept': '*/*',
                'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
            },
            params: {
                'id': userData.userData.id
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
            <h3>Сигурни ли сте че искате да деактивирате акаунта си?</h3>
            <RadioGroup name="use-radio-group">
                <MyFormControlLabel value="NOTIME" label="Нямам време" control={<Radio />} />
                <MyFormControlLabel value="NONEED" label="Не се нуждая от Helti" control={<Radio />} />
            </RadioGroup>
            <Button disabled={reason !== '' ? false : true} onClick={deactivateUser} variant="contained" endIcon={<DeleteIcon />}>
                Деактивирай
            </Button>
        </div>
    )
}

export default DeactivateAccountPage