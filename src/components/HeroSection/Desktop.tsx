import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Theme,
  Typography,
} from '@mui/material';

export const Desktop = () => {
  return (
    <Grid marginLeft={0} container spacing={10} width={'100%'}>
      <Grid
        sx={{
          paddingLeft: '2rem !important',
          paddingRight: '2rem !important',
        }}
        item
        xs={12}
        md={6}
      >
        <Stack
          alignItems={'start'}
          justifyContent={'space-between'}
          spacing={3}
          height={'100%'}
        >
          <Stack spacing={1}>
            <Typography variant='h1'>
              Expert Web Development Services for Your Business
            </Typography>
            <Typography width={'80%'}>
              Crafting Stunning Websites and Applications to Elevate Your Online
              Presence and Drive Success
            </Typography>
          </Stack>
          <Box>
            <Button href='/#contact' color='secondary' size='large' variant='contained'>
              Get In Touch
            </Button>
          </Box>
        </Stack>
      </Grid>
      <Grid
        sx={{
          paddingLeft: '2rem !important',
          paddingRight: '2rem !important',
        }}
        item
        xs={12}
        md={6}
      >
        <img width='100%' src='/hero.svg' alt='Hero Image' />
      </Grid>
    </Grid>
  );
};

export default Desktop;
