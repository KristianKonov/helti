import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
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

export const BiologicalFirstStep = (props) => {
    return(
        <>
            <div className="dashboard-input-wrapper">
                <TextField type="number" color='primary' id="outlined-basic" value={props.age !== null ? props.age : ''} onChange={(e) => props.setAge(e.target.value)} label="Възраст" variant="outlined" />
            </div>
            <div className="dashboard-input-wrapper">
                <TextField type="number" color='primary' id="outlined-basic" value={props.height !== null ? props.height : ''} onChange={(e) => props.setHeight(e.target.value)} label="Височина" variant="outlined" />
            </div>
            <div className="dashboard-input-wrapper">
                <h3>Пол:</h3>
                <RadioGroup name="use-radio-group">
                    <props.GenderForm value="MALE" label="Мъж" control={<Radio />} />
                    <props.GenderForm value="FEMALE" label="Жена" control={<Radio />} />
                </RadioGroup>
            </div>
            <div className="dashboard-input-wrapper">
                <h3>Цел:</h3>
                <RadioGroup name="use-radio-group">
                    <props.GoalForm value="CUT" label="Отслабване" control={<Radio />} />
                    <props.GoalForm value="BULK" label="Покачване на мускулна маса" control={<Radio />} />
                </RadioGroup>
            </div>
            <LoadingButton
            color="secondary"
            onClick={props.addBiologicalData}
            loading={props.loading}
            loadingPosition="start"
            startIcon={<AddIcon />}
            variant="contained"
            >
            Добави
            </LoadingButton>
        </>
    )
}