'use client'

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularUnderLoad() {
  return (
    <div className="flex items-center justify-center w-full h-[100vh] bg-gray-200 z-50 opacity-30">
         <CircularProgress disableShrink />
  </div>
  );
}
