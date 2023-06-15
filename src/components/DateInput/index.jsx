import React from 'react'
import './style.css'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { TextField } from '@mui/material';

const DateInput = ({value, onChange, label, minDate}) => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#FF7900",
            },
        },
    });
    return (<>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
            <DesktopDatePicker
                minDate={minDate}
                label={label}
                inputFormat="dd-MM-yyyy"
                value={value}
                onChange={onChange}
                showToolbar={true}
                disableFuture={true}
                renderInput={(params) => (
                    <ThemeProvider theme={theme}>
                        <TextField {...params} sx={{width:'100%'}} />
                    </ThemeProvider>
                )}
            />
        </LocalizationProvider>
        </>
    )
}

export default DateInput
