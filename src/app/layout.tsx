import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Toaster} from 'react-hot-toast';
import '../styles/globals.css';
import QueryProvider from '@/context/query-provider';
import 'react-datepicker/dist/react-datepicker.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Procurement Automation App',
  description: 'This is a procurement automation app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
