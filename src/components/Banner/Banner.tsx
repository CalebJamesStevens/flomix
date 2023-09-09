'use client';
import React from 'react';

import {
  AppBar,
  Button,
  Stack,
  Toolbar,
} from '@mui/material';
import { Breakpoint } from '../Breakpoint/Breakpoint';
import theme from '../ThemeRegistry/theme';

export const Banner = () => {
  return (
    <AppBar
      sx={{ width: '100%', backgroundColor: theme.palette.primary.main}}
      elevation={0}
      color='transparent'
      position='relative'
    >
      <Toolbar>
        <Stack
          paddingX={8}
          paddingY={4}
          sx={{
            [theme.breakpoints.down('sm')]: {
              paddingX: 1,
              paddingY: 2,
              justifyContent: 'center'

            },
          }}
          width={'100%'}
          direction='row'
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Breakpoint direction='up' breakpoint='md'>
            <img height={'24px'} src='/crossLinkLogo.svg' alt='Cross Link Logo' />
          </Breakpoint>
          <Breakpoint direction='down' breakpoint='md'>

              <img height={'24px'} src='/crossLinkLogo.svg' alt='Cross Link Logo' />

          </Breakpoint>
          <Breakpoint direction='up' breakpoint='sm'>
            <Stack direction='row' spacing={2}>
              <Button color='secondary' sx={{ textTransform: 'capitalize' }} href='/#services'>
                Services
              </Button>
              <Button color='secondary' sx={{ textTransform: 'capitalize' }} href='/#about'>
                About
              </Button>
              <Button color='secondary' sx={{ textTransform: 'capitalize' }} href='/#contact'>
                Contact
              </Button>
            </Stack>
          </Breakpoint>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Banner;
