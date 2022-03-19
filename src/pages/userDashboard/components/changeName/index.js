import React, {useContext, useEffect, useState} from 'react'
import UserContext from '../../../../context'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Cookies from 'js-cookie'
import axios from 'axios'
import { Stack } from '@mui/material';
import { Alert } from '@mui/material';


const ChangeNamePage = () => {
    const userData = useContext(UserContext)
    const [firstName, setFirstName] = useState(' ')
    const [lastName, setLastName] = useState(' ')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState({
        'status': false,
        'message': ''
    })
    const [error, setError] = useState({
        'status': false,
        'message': ''
    })
    
    useEffect(() => {
        setFirstName(userData.userData.firstName)
        setLastName(userData.userData.lastName)
    },[userData.userData?.firstName])

    const saveNameChange = () => {
        if(userData.userData.firstName === firstName && userData.userData.lastName === lastName) {
            setError({
                'status': true,
                'message': "No changes found!"
            })
        } else {
            setLoading(true)
            var data = JSON.stringify({
            "firstName": firstName,
            "lastName": lastName
            });
    
            var config = {
            method: 'put',
            url: 'http://localhost:8080/api/user/update',
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
                    'message': 'You have successfully changed your name to ' + firstName + ' ' + lastName
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
                    'message': 'Something went wrong!'
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
            <h2>Change name</h2>
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
            {(firstName !== undefined && lastName !== undefined) ?
                <>
                    <div className="dashboard-input-wrapper">
                        <TextField color='primary' id="outlined-basic" value={firstName} onChange={(e) => setFirstName(e.target.value)} label="First Name" variant="outlined" />
                    </div>
                    <div>
                        <TextField color='primary' id="outlined-basic" value={lastName} onChange={(e) => setLastName(e.target.value)} label="Last Name" variant="outlined" />
                    </div>
                    <LoadingButton
                    color="secondary"
                    onClick={saveNameChange}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    >
                    Save
                    </LoadingButton>
                </>
            :
                <h2>Loading...</h2>
            }
        </div>
    )
}

export default ChangeNamePage