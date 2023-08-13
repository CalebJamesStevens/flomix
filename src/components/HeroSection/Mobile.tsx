import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Theme,
  Typography,
} from '@mui/material';

export const Mobile = () => {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'space-between'}
      spacing={3}
      height={'100%'}
    >
      <Stack spacing={1}>
        <Typography textAlign={'center'} variant='h1'>
          Quality Websites for Small Businesses
        </Typography>
        <Typography textAlign={'center'}>
          Crafting Stunning Websites and Applications to Elevate Your Online
          Presence and Drive Success
        </Typography>
      </Stack>
      <Box>
        <Button  href='/#contact' color='secondary' size='large' variant='contained'>
          Get In Touch
        </Button>
      </Box>
    </Stack>
  );
};

export default Mobile;
