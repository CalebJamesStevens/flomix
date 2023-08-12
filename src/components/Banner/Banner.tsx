'use client';
import React from 'react';

import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
} from '@mui/material';
import { Breakpoint } from '../Breakpoint/Breakpoint';
import { Menu, MenuOpen } from '@mui/icons-material';
import theme from '../ThemeRegistry/theme';

export const Banner = () => {
  const [mainMenuOpen, setMainMenuOpen] = React.useState(false);

  return (
    <AppBar
      sx={{ width: '100%' }}
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
            },
          }}
          width={'100%'}
          direction='row'
          justifyContent={'space-between'}
        >
          <Breakpoint direction='up' breakpoint='md'>
            <img height={'42px'} src='/flomixLogo.svg' alt='Flomix Logo' />
          </Breakpoint>
          <Breakpoint direction='down' breakpoint='md'>
            <Box sx={{marginX: 'auto'}}>
              <img height={'42px'} src='/flomixLogo.svg' alt='Flomix Logo' />
            </Box>
          </Breakpoint>
          <Breakpoint direction='up' breakpoint='sm'>
            <Stack direction='row' spacing={2}>
              <Button sx={{ textTransform: 'capitalize' }} href='/#services'>
                Services
              </Button>
              <Button sx={{ textTransform: 'capitalize' }} href='/#about'>
                About
              </Button>
            </Stack>
            <Button href='/#contact' color='secondary' size='large' variant='contained'>
              Get In Touch
            </Button>
          </Breakpoint>
          {/* <Breakpoint direction='down' breakpoint='sm'>
            <IconButton
              onClick={() => {
                setMainMenuOpen(true);
              }}
            >
              <Menu />
            </IconButton>
            <Drawer
              anchor='right'
              onClose={() => {
                setMainMenuOpen(false);
              }}
              open={mainMenuOpen}
              PaperProps={{
                sx: { '&.MuiPaper-root': { paddingX: 2 } },
              }}
            >
              <Stack alignItems={'end'} spacing={2}>
                <IconButton
                  onClick={() => {
                    setMainMenuOpen(false);
                  }}
                >
                  <MenuOpen />
                </IconButton>
                <Button sx={{ textTransform: 'capitalize' }} href='/#services'>
                  Services
                </Button>
                <Button sx={{ textTransform: 'capitalize' }} href='/#about'>
                  About
                </Button>
                <Button color='secondary' href='/#contact' variant='contained'>
                  Get In Touch
                </Button>
              </Stack>
            </Drawer>
          </Breakpoint> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Banner;
