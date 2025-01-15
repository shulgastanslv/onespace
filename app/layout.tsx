import { Providers } from './providers';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

const inter = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OneSpace',
  description:
    "OneSpace is a personal secure space for storing confidential information and organizing the user's digital life.",
  icons: {
    icon: '/favicon.ico',
  },
  creator: 'Stanislav Shulga',
  publisher: 'Stanislav Shulga',
  category: 'Security',
  keywords: ['OneSpace', 'Secure', 'Personal', 'Digital', 'Life'],
  openGraph: {
    title: 'OneSpace',
    description:
      "OneSpace is a personal secure space for storing confidential information and organizing the user's digital life.",
    url: 'https://onespace.com',
    siteName: 'OneSpace',
    images: [
      {
        url: '/favicon.ico',
      },
    ],
  },
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
