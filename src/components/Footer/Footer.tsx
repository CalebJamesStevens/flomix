'use client';

import { Box } from '@mui/material';

export const Footer = () => {
  return (
    <Box
      sx={{
        background: (theme) => theme.palette.primary.main,
        color: 'white',
        padding: 4,
        textAlign: 'center',
      }}
    >
      Copyright Cross Link Design @2023. All rights reserved.
    </Box>
  );
};

export default Footer;
