import Input from '@mui/material/Input';
import React from 'react'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF7900",
    },
  },
});

function InputField(props) {
  return (
    <ThemeProvider theme={theme}>
    <>
        <FormControl variant="standard" fullWidth size='small'>
            <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
            <Input 
                style={{padding:'0 10px'}}
                // type={type}
                // id={id}
                // endAdornment={endAdornment}
                // error = {error}
                // onChange = {onChange}
                // defaultValue = {defaultValue}
                // readOnly={readOnly}
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
                {...props}
            />
            <label className='error_label'>{props.error?.message}</label>
        </FormControl>
    </>
    </ThemeProvider>
  )
}

export default InputField
