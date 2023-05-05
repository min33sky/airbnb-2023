'use client';

import React, { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/types';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useRentModal from '@/hooks/useRentModal';

interface Props {
  currentUser?: SafeUser | null;
}

export default function UserMenu({ currentUser }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const targetRef = useOutsideClick(() => setIsOpen(false));

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={() => alert('구현중')}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </div>

        <div
          onClick={toggleOpen}
          className="flex cursor-pointer items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar imageUrl={currentUser?.image || ''} />
          </div>
        </div>

        {isOpen && (
          <div
            ref={targetRef}
            className="absolute right-0 top-12 z-50 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4"
          >
            <div className="flex cursor-pointer flex-col">
              {currentUser ? (
                <>
                  <MenuItem
                    label="My trips"
                    onClick={() => router.push('/trips')}
                  />
                  <MenuItem
                    label="My favorites"
                    onClick={() => router.push('/favorites')}
                  />
                  <MenuItem
                    label="My reservations"
                    onClick={() => router.push('/reservations')}
                  />
                  <MenuItem
                    label="My properties"
                    onClick={() => router.push('/properties')}
                  />
                  <MenuItem
                    label="Airbnb your home"
                    onClick={rentModal.onOpen}
                  />
                  <hr />
                  <MenuItem label="Logout" onClick={() => signOut()} />
                </>
              ) : (
                <>
                  <MenuItem label="Login" onClick={() => loginModal.onOpen()} />
                  <MenuItem
                    label="Sign Up"
                    onClick={() => {
                      registerModal.onOpen();
                    }}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
