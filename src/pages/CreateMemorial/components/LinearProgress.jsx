import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 2,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#DADADA",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 2,
    backgroundColor: "var(--main)",
  },
}));
export default function CustomizedLinearProgress({width}) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <BorderLinearProgress variant="determinate" value={width} />
      </Box>
    );
  }