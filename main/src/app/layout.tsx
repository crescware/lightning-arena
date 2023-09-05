import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren, ReactElement } from 'react';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lightning Arena',
  description: '',
};

export default function RootLayout({
  children,
}: PropsWithChildren): ReactElement {
  // 100svh は iOS 限りの対応
  /* eslint-disable-next-line tailwindcss/no-contradicting-classname */
  const hScreenWorkAround = clsx('h-[100svh] h-screen');

  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          hScreenWorkAround,
          'w-full text-slate-800 dark:text-slate-50',
          'bg-slate-100 dark:bg-slate-800',
        )}
      >
        {children}
      </body>
    </html>
  );
}
