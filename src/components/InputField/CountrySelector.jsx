import React, {useState} from 'react'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useGetCountryList } from '../../api/useGetPlan';
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF7900",
    },
  },
});

function CountrySelector({id, label,onChange,value, error}) {

  const {data} = useGetCountryList()


  return (
    <ThemeProvider theme={theme}>
      <FormControl variant="standard" fullWidth size='small'>
          <InputLabel id={id}>{label}</InputLabel>

          <Select
            labelId={id}
            id="demo-simple-select-standard"
            value={value}
            onChange={onChange}
            label="Country"
          >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              data?.map((cont)=>(
                <MenuItem key={cont.id} value={cont.name}>{cont.name}</MenuItem>
              ))
            }
            
          </Select>
          {
            error ? 
            <label className='error_label'>Country is required</label>
            :
            null
          }

          {/* <Input 
              style={{padding:'0 5px'}}
              type={type}
              id={id}
              endAdornment={endAdornment}
              error = {error}
          /> */}
      </FormControl>
    </ThemeProvider>
  )
}

export default CountrySelector
