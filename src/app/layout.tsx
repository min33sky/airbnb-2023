import './globals.css';
import { Nunito } from 'next/font/google';

export const metadata = {
  title: 'Airbnb 2023',
  description: 'Airbnb 2023 Clone',
};

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-nunito ${nunito.variable}`}>{children}</body>
    </html>
  );
}
