import React from 'react';
import Logo from './Logo';
import Container from '../Container';
import Search from './Search';
import UserMenu from './UserMenu';
import { User } from '@prisma/client';
import { SafeUser } from '@/app/types';

interface Props {
  currentUser?: SafeUser | null;
}

export default function Navbar({ currentUser }: Props) {
  return (
    <header className="fixed z-10 w-full bg-white shadow-md">
      <nav className="border-b-[1px] py-4">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </nav>
    </header>
  );
}
