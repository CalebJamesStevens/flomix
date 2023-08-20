// react typescript component

import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';
import { Breakpoint } from '../Breakpoint/Breakpoint';

export const About = () => {
  return (
    <Stack id='about' spacing={4}>
      <Typography textAlign={'center'} variant='h2'>
        About Flomix
      </Typography>
      <Breakpoint breakpoint='sm' direction='up'>
        <Stack direction={'row'} alignItems={'end'} spacing={4}>
          <Box width={'200px'} height='200px' sx={{ aspectRatio: 1 }}>
            <Box
              borderRadius={'100%'}
              width={'200px'}
              height={'200px'}
              sx={{ objectFit: 'cover' }}
              component='img'
              src='/MaddieAndDaddy.jpg'
              alt='Picture of Caleb Stevens with his infant daughter'
            />
          </Box>
          <Typography>
            <Typography variant='h1' component={'span'}>
              Hi!
            </Typography>{' '}
            My name is Caleb Stevens I started Flomix to serve those who value
            accessible and high quality websites. Whether you&apos;re looking
            for a website for your personal portfolio, side gig, or business we
            have something for you.
          </Typography>
        </Stack>
      </Breakpoint>
      <Breakpoint breakpoint='sm' direction='down'>
        <Box width={'100%'}>
          <Box marginX={'auto'} width={'fit-content'}>
            <Box
              borderRadius={'100%'}
              width={'200px'}
              height={'200px'}
              sx={{ objectFit: 'cover' }}
              marginX={'auto'}
              component='img'
              src='/MaddieAndDaddy.jpg'
              alt='Picture of Caleb Stevens with his infant daughter'
            />
          </Box>
        </Box>
        <Typography>
          <Typography variant='h1' component={'span'}>
            Hi!
          </Typography>{' '}
          My name is Caleb Stevens I started Flomix to serve those who value
          accessible and high quality websites. Whether you&apos;re looking for
          a website for your personal portfolio, side gig, or business we have
          something for you.
        </Typography>
      </Breakpoint>
      <Box>
        <Typography variant='h3' component='p'>
          Values:
        </Typography>{' '}
        <Typography>
          Accessibility is at the heart of everything we do. We are committed to
          building websites that are inclusive and can be enjoyed by everyone,
          regardless of their abilities.
        </Typography>
      </Box>
      <Box>
        <Typography>
          I believe that design should be both aesthetically pleasing and
          functional. Our creative flair ensures that your website stands out
          from the crowd while delivering a seamless user experience.
        </Typography>
      </Box>
      <Typography>
        I&apos;m excited to collaborate with you and create a digital presence
        that reflects your vision and values. Get in touch with us today, and
        let&apos;s embark on a journey of innovation and accessibility together!
      </Typography>
    </Stack>
  );
};

export default About;
