import './globals.css';
import { Nunito } from 'next/font/google';
import getCurrentUser from '../utils/getCurrentUser';
import ClientProvider from '@/components/ClientProvider';
import Navbar from '@/components/navbar/Navbar';

export const metadata = {
  title: 'Airbnb 2023',
  description: 'Airbnb 2023 Clone',
};

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  console.log('##### currentUser: ', currentUser);

  return (
    <html lang="en">
      <body className={`font-nunito ${nunito.variable}`}>
        <ClientProvider>
          <Navbar currentUser={currentUser} />
        </ClientProvider>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
