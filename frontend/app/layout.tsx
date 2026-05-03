
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'E-Learning Platform',
  description: 'Learn courses and earn certificates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
