import React from 'react'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'

const theme = createTheme({
    palette: {
      primary: {
        main: "#FF7900",
      },
    },
  });
 
const SelectInput = ({value,inputRef, onChange, id, label,options}) => {
  return (
    <ThemeProvider theme={theme}>
        <FormControl fullWidth>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                id={id}
                value={value}
                label={label}
                onChange={onChange}
                inputRef={inputRef}
            >
                {
                    options.map((option, i)=>(
                        <MenuItem key={i} value={option.value}>{option.label}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    </ThemeProvider>
   
  )
}

export default SelectInput