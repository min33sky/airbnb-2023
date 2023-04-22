import ClientProvider from './components/ClientProvider';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import getCurrentUser from './utils/getCurrentUser';

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

          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
