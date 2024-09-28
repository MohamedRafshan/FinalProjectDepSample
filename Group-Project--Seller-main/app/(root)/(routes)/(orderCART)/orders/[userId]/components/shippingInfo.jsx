'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { Button } from '@/components/ui/button';
import Typography from '@mui/material/Typography';



export default function VerticalLinearStepper() {

    const [activeStep, setActiveStep] = React.useState(false);

    const steps = [
        {
          label: 'Order is Processing',
          description: `Order will ship within 48 hours`,
          status: true || activeStep
        },
        {
          label: 'Order is Shipped from the warehouse',
          description: 'Order has been shipped from our warehouse',
          status: true || activeStep 
        },
        {
          label: 'Order is arrived to district office',
          description: `Order is arrived to district office and will be delivered soon`,
          status: false || activeStep
        },
        {
          label: 'Order is shipped from district office',
          description: `Order is hand over to delivery person and will be delivered soon`,
          status: false || activeStep
        },
        {
          label: 'Order is delivered',
          description: `Order is delivered successfully`,
          status: activeStep
        },
      ];


  

  const Delivered = () => {
    setActiveStep(true);
  };



  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label} completed={step.status} sx={{
            color: 'success.main',
          }}>
            <StepLabel>{step.label}</StepLabel>
              <StepContent>
              <Typography>{step.description}</Typography>
              </StepContent>
          </Step>
        ))}
      </Stepper>
      <Button
        variant='contained'
        onClick={Delivered}
        className='mt-4 font-bold py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-700 text-white'
        disabled={activeStep}
      >
        Order Delivered
      </Button>
    </Box>
  );
}
