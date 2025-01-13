import { Providers } from './providers';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import Sidebar from '@/components/sidebar/Sidebar';

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
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
        <main className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">
              <div className="mt-16"> 
                {children}
              </div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
