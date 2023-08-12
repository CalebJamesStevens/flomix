import Banner from '@/components/Banner/Banner';
import Footer from '@/components/Footer/Footer';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { Container } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flomix',
  description: 'Your expert web developers',
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
