import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import ModalProvider from '@/components/modal-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { ToasterProvider } from '@/components/toaster-provider';
import { CrispProvider } from '@/components/crisp-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmartGenix',
  description:
    'Experience the future of creativity and productivity with our all-in-one SaaS AI web application',
  authors: [
    { name: 'Aditya Yaduvanshi', url: 'https://adityayads.vercel.app' },
  ],
  keywords: ['ai', 'chatgpt', 'saas', 'nextjs', 'ai-chat'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <ModalProvider />
            <ToasterProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
