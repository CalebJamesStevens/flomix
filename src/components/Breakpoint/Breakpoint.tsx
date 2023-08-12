'use client';
import React from 'react';

import { useMediaQuery } from '@mui/material';
import theme from '../ThemeRegistry/theme';

interface BreakpointProps {
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  direction: 'up' | 'down' | 'only' | 'not';
}

export const Breakpoint = ({
  breakpoint,
  children,
  direction,
}: BreakpointProps) => {
  const isQueryMatch = useMediaQuery(theme.breakpoints[direction](breakpoint));

  if (!isQueryMatch) {
    return null;
  }

  return <>{children}</>;
};
