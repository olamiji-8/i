import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { MdAccountBalanceWallet } from 'react-icons/md';
import {FaPencilAlt} from 'react-icons/fa'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';


const ColouredStepIconRoot = styled('div')(({ ownerState }) => ({
    background: "rgba(237, 233, 229, 0.45)",
    zIndex: 1,
    width: 40,
    height: 40,
    display: 'flex',
    color: 'var(--main)',
    borderRadius: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      background:"var(--main)",
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        color: '#fff',

    }),
    ...(ownerState.completed && {
      background:"var(--main)",
    color: '#fff',

    }),
  }));
  
  function ColouredStepIcon(props) {
    const { active, completed, className } = props;
    const icons = {
      1: <FaPencilAlt size={18}/>,
      2: <MdAccountBalanceWallet size={18}/>,
    };
    return (
      <ColouredStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColouredStepIconRoot>
    );
  }
  
  ColouredStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };



const steps = [
  {
    label: 'DECEASED DETAILS',
    },
  {
    label: 'PAYMENT PLAN',
    },
  
];

export default function VerticalLinearStepper({activeStep}) {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={ColouredStepIcon}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}