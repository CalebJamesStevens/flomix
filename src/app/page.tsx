import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import WebIcon from '@mui/icons-material/Web';
import CodeIcon from '@mui/icons-material/Code';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { Breakpoint } from '@/components/Breakpoint/Breakpoint';
import About from '@/components/About/About';
import Mobile from '@/components/HeroSection/Mobile';
import Desktop from '@/components/HeroSection/Desktop';
import Contact from '@/components/Contact/Contact';
import SocialProof from '@/components/SocialProof/SocialProof';
import theme from '@/components/ThemeRegistry/theme';

export default function Home() {
  return (
    <Stack component={'main'} paddingTop={8}  spacing={14}>
      <Breakpoint breakpoint='md' direction='down'>
        <Mobile />
      </Breakpoint>
      <Breakpoint breakpoint='md' direction='up'>
        <Desktop />
      </Breakpoint>
      <Stack
      id='services'
        justifyContent='center'
        alignItems={'center'}
        component={'section'}
        spacing={4}
      >
        <Box>
          <Typography textAlign={'center'} variant='h2'>
            What do we offer?
          </Typography>
          <Typography textAlign={'center'}>
            Cross Link Design offers a comprehensive range of services to elevate your
            online presence and stand out in the digital landscape.
          </Typography>
        </Box>
        <Container>
          <Stack justifyContent={'center'} alignItems={'center'}>
            <Grid
              marginLeft={0}
              justifyContent={'center'}
              container
              spacing={8}
            >
              <Grid
                sx={{
                  paddingLeft: '2rem !important',
                  paddingRight: '2rem !important',
                  maxWidth: '350px',
                }}
                item
                xs={12}
                sm={6}
                md={4}
              >
                <Card sx={{ padding: 4, height: '100%' }} title='Development'>
                  <CodeIcon sx={{ height: '5rem', width: '5rem' }} />
                  <Typography component='p' fontSize='2rem' fontWeight='500'>
                    Development
                  </Typography>
                  <Typography marginTop='1rem' variant='body2'>
                    Crafting tailored web solutions with cutting-edge
                    technologies.
                  </Typography>
                </Card>
              </Grid>
              <Grid
                sx={{
                  paddingLeft: '2rem !important',
                  paddingRight: '2rem !important',
                  maxWidth: '350px',
                }}
                item
                xs={12}
                sm={6}
                md={4}
              >
                <Card sx={{ padding: 4, height: '100%' }} title='Design'>
                  <WebIcon sx={{ height: '5rem', width: '5rem' }} />
                  <Typography component='p' fontSize='2rem' fontWeight='500'>
                    Design
                  </Typography>
                  <Typography marginTop='1rem' variant='body2'>
                    Creating stunning, intuitive interfaces that reflect your
                    brand.
                  </Typography>
                </Card>
              </Grid>
              <Grid
                sx={{
                  paddingLeft: '2rem !important',
                  paddingRight: '2rem !important',
                  maxWidth: '350px',
                }}
                item
                xs={12}
                sm={6}
                md={4}
              >
                <Card
                  sx={{ padding: 4, height: '100%' }}
                  title='Responsiveness'
                >
                  <MobileFriendlyIcon sx={{ height: '5rem', width: '5rem' }} />
                  <Typography component='p' fontSize='2rem' fontWeight='500'>
                    Responsiveness
                  </Typography>
                  <Typography marginTop='1rem' variant='body2'>
                    Ensuring flawless performance across devices and screen
                    sizes.
                  </Typography>
                </Card>
              </Grid>
              <Grid
                sx={{
                  paddingLeft: '2rem !important',
                  paddingRight: '2rem !important',
                  maxWidth: '350px',
                }}
                item
                xs={12}
                sm={6}
                md={4}
              >
                <Card sx={{ padding: 4, height: '100%' }} title='Hosting'>
                  <CloudQueueIcon sx={{ height: '5rem', width: '5rem' }} />
                  <Typography component='p' fontSize='2rem' fontWeight='500'>
                    Hosting
                  </Typography>
                  <Typography marginTop='1rem' variant='body2'>
                    Providing reliable and secure hosting for seamless browsing.
                  </Typography>
                </Card>
              </Grid>
              <Grid
                sx={{
                  paddingLeft: '2rem !important',
                  paddingRight: '2rem !important',
                  maxWidth: '350px',
                }}
                item
                xs={12}
                sm={6}
                md={4}
              >
                <Card sx={{ padding: 4, height: '100%' }} title='Maintenance'>
                  <EngineeringIcon sx={{ height: '5rem', width: '5rem' }} />
                  <Typography component='p' fontSize='2rem' fontWeight='400'>
                    Maintenance
                  </Typography>
                  <Typography marginTop='1rem' variant='body2'>
                    Keeping your website up-to-date, secure, and optimized.
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Stack>
      <SocialProof />
      <Box component={'section'} paddingBottom={8}>
        <About />
      </Box>
      <Contact />
    </Stack>
  );
}
