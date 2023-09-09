import Banner from '@/components/Banner/Banner';
import Footer from '@/components/Footer/Footer';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { Container } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cross Link Design | Salem Oregon Web Design Company',
  description: 'Crss Link Design is a Salem Oregon Website Design company creating custom websites for small businesses that you can manage yourself. We serve Bend Oregon, Redmond Oregon, Prineville Oregon.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeRegistry>
          <Banner />
          <Container>{children}</Container>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
