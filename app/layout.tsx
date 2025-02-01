import { Providers } from './providers';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

const inter = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Onespace',
  description:
    'Onespace is a personal secure space for storing confidential information and organizing the user\'s digital life.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
