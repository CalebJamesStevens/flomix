'use client';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import theme from '../ThemeRegistry/theme';

export const Contact = () => {
  return (
        <Box component={'section'} id='contact' paddingBottom={8}>
    <Stack alignItems={'center'}>
        <Typography fontWeight={500} textAlign={'center'} variant='h2'>
          Contact Us
        </Typography>
        <Typography textAlign={'center'}>
          We are always happy to hear from you. Send us a message and we will
          get back to you as soon as possible.
        </Typography>
      </Stack>
      <Box
        component={'form'}
       onSubmit={async (event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const res = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify({
              message: formData.get("message"),
              name: formData.get("name"),
              email: formData.get("email"),
              number: formData.get("number"),
            }),
            cache: "no-store",
          });

          if (!res.ok) {
            console.error("Failed to send message");
            return;
          }

          // setEmailSent(true);
        }}
      >
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          spacing={4}
          sx={{ marginTop: '5rem' }}
        >
          <Stack
            alignItems={'center'}
            direction={'row'}
            justifyContent={'space-between'}
            spacing={4}
            sx={{ width: '100%', [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 2,
              spacing: 0
            } }}
          >
            <TextField
              fullWidth
              label='Name'
              name='name'
              required
              variant='outlined'
            />
            <TextField
            sx={{ [theme.breakpoints.down('md')]: {
              marginLeft: '0!important'
            } }}
              fullWidth
              label='Email'
              type='email'
              name='email'
              required
              variant='outlined'
            />
            <TextField
            sx={{ [theme.breakpoints.down('md')]: {
              marginLeft: '0!important'
            } }}
              fullWidth
              label='Phone Number'
              type='tel'
              name='number'
              variant='outlined'
            />
          </Stack>
          <TextField
            fullWidth
            label='Tell us about your needs!'
            name='message'
            multiline
            required
            minRows={4}
          />
        </Stack>
        <Stack alignItems={'start'} spacing={2} paddingTop={5}>
          <Button
            type='submit'
            color='secondary'
            size='large'
            variant='contained'
          >
            Send us a message
          </Button>
          <Box>
Or Email Us at{' '}
          <Link
            type='submit'
            color='secondary'
            href='mailto:info@flomix.app'
            
          >
            info@flomix.app
          </Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
export default Contact;
