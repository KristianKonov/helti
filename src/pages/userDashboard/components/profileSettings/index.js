import React from 'react'
import { Helmet } from 'react-helmet-async'
import ChangeNamePage from '../changeName'
import ChangePasswordPage from '../changePassword'
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';

const ProfileSettingsPage = () => {
    return(
        <div>
            <Helmet>
                <title>
                    Настройки | Helti
                </title>
            </Helmet>
            <div>
                <h2>Настройки на профила</h2>
                <p>Посочете върху отдела, които искате да промените.</p>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={6}
                className="dashboard-form-layout"
            >
                <div>
                    <ChangeNamePage />
                </div>
                <div>
                    <ChangePasswordPage />
                </div>
            </Stack>
            </div>
        </div>
    )
}

export default ProfileSettingsPage