'use client';

import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import theme from '../ThemeRegistry/theme';

export default function SocialProof() {
  return (
    <Stack
        id='socials'
        justifyContent='center'
        alignItems={'center'}
        component={'section'}
        spacing={2}
        width={'100%'}
      >
          <Typography textAlign={'center'} variant='h2'>
            What are people saying?
          </Typography>
        <Stack sx={{
          [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            gap: theme.spacing(2),
            flexWrap: 'wrap',
          },
          maxWidth: '720px',
          // alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Card variant='outlined' sx={{  marginTop: 2, maxWidth: '352px'}}>
            <CardContent>
              <Image src='/socials/HannahStevensArtIcon.png' width={100} height={100} style={{
                shapeOutside: 'square()',
                float: 'left',
                marginRight: '1rem',
                marginBottom: '-10px',

              }} alt=''/>
              <Typography lineHeight={1.7} cite='https://hannahstevens.art' component={'blockquote'}>
              &quot;I got back into art after having a baby and needed a website to showcase my work. Cross Link created a beautiful website that really emphasizes my brand and style.&quot;
              <Stack marginTop={1} justifyContent={'end'} component={'footer'}>
                <Box textAlign={'end'} component={'cite'}>
                  - Hannah Stevens Art
                </Box>
              </Stack>
              </Typography>
            </CardContent>
          </Card>
          <Card variant='outlined' sx={{ marginTop: 2, maxWidth: '352px'}}>
            <CardContent>
              <Image src='/socials/TheReptileZoneLogo.png' width={100} height={100} style={{
                shapeOutside: 'square()',
                float: 'left',
                marginRight: '1rem',
                marginBottom: '-10px',

              }} alt=''/>
              <Typography lineHeight={1.7} cite='https://thereptilezone.com' component={'blockquote'} height={'200px'}>
              &quot; The transformation from our old WordPress site is mind-blowing. The new site captures our passion for reptiles perfectly.&quot;
              <Stack marginTop={4.5} justifyContent={'end'} component={'footer'}>
                <Box textAlign={'end'} component={'cite'}>
                  - Jeff Jensen, The Reptile Zone
                </Box>
              </Stack>
              </Typography>
            </CardContent>
          </Card>
          
        </Stack>
    </Stack>
  )
}
