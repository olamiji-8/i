import React from 'react';
import { createTheme, FormControl, TextField, ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: "#FF7900",
        },
    },
});

export default function TextFielded(props, value) {
    return (
        <ThemeProvider theme={theme}>
            <FormControl variant="standard" fullWidth size='small'>
                <TextField
                    // style={{padding:'0 10px'}}
                    variant='standard'
                    size="small"
                    InputProps={{
                        endAdornment: props.endIcon,
                        classes: {
                            notchedOutline: {
                                borderColor: '#FFFFFF',
                                borderWidth: 1,
                                '&:hover': {
                                    borderColor: '#ff0000',
                                    borderWidth: 2
                                },
                            }
                        },
                    }}
                    {...props}
                />
                <label className='error_label'>{props.error?.message}</label>
            </FormControl>
        </ThemeProvider>
    );
}