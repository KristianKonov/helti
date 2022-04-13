import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Cookies from 'js-cookie'
import axios from 'axios'
import { Stack } from '@mui/material';
import { Alert } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import EditIcon from '@mui/icons-material/Edit';

const ChangePasswordPage = () => {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [success, setSuccess] = useState({
        'status': false,
        'message': ''
    })
    const [validatePassword, setValidatePassword] = useState(true)
    const [error, setError] = useState({
        'status': false,
        'message': ''
    })

    const savePasswordChange = () => {
        if(newPassword !== confirmNewPassword)
            setValidatePassword(false)
        if(!validatePassword) {
            setError({
                'status': true,
                'message': "No changes found!"
            })
        } else {
            setLoading(true)
            var data = JSON.stringify({
            "newPassword": newPassword,
            "oldPassword": password
            });

            var config = {
            method: 'put',
            url: 'http://localhost:8080/api/user/change-password',
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
                    'message': 'Успешно променихте своята парола!'
                })
                setError({})
            })
            .catch(function (error) {
                setLoading(false)
                setError({
                    'status': true,
                    'message': 'Грешна парола!'
                })
                setSuccess({})
            });

        }
    }

    return(
        <div>
            <div className="dashboard-change-form">
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
                {true ?
                    <>
                        <h4 className={editMode ? 'dashboard-active-label' : ''}>Промяна на парола:</h4>
                        <div className="dashboard-input-wrapper">
                            <TextField type="password" disabled={editMode ? false : true} color='primary' value={editMode ? password : 'password'} onChange={(e) => setPassword(e.target.value)} label="Old Password" variant="outlined" />
                        </div>
                        <div className="dashboard-input-wrapper">
                            <TextField type="password" disabled={editMode ? false : true} color='primary' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} label="New Password" variant="outlined" />
                        </div>
                        <div className="dashboard-input-wrapper">
                            <TextField type="password" disabled={editMode ? false : true} color='primary' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} label="Confirm New Password" variant="outlined" />
                        </div>
                        {
                            editMode ?
                            <LoadingButton
                            color="secondary"
                            onClick={savePasswordChange}
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            >
                            Save
                            </LoadingButton>
                            :
                            <LoadingButton
                                color="secondary"
                                className="dashboard-mobile-only"
                                onClick={() => setEditMode(true)}
                                loadingPosition="start"
                                startIcon={<EditIcon />}
                                variant="contained"
                            >
                                Промени
                            </LoadingButton>
                        }
                    </>
                :
                    <Stack spacing={2}>
                        <Skeleton variant="rectangular" width={210} height={55} />
                        <Skeleton variant="rectangular" width={210} height={55} />
                    </Stack>
                }
                {editMode ? '' : 
                <div className="form-overlay">
                    <LoadingButton
                        color="secondary"
                        onClick={() => setEditMode(true)}
                        loadingPosition="start"
                        startIcon={<EditIcon />}
                        variant="contained"
                    >
                    Промени
                    </LoadingButton>
                </div>
                }
            </div>
        </div>
    )
}

export default ChangePasswordPage