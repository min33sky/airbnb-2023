'use client';

import React, { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useOutsideClick from '@/hooks/useOutsideClick';
import useLoginModal from '../hooks/useLoginModal';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useLoginModal();
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
            <Avatar />
          </div>
        </div>

        {isOpen && (
          <div
            ref={targetRef}
            className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4"
          >
            <div className="flex cursor-pointer flex-col">
              <>
                <MenuItem label="Login" onClick={() => loginModal.onOpen()} />
                <MenuItem
                  label="Sign Up"
                  onClick={() => registerModal.onOpen()}
                />
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
