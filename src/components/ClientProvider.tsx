'use client';

import React from 'react';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';
import { Toaster } from 'react-hot-toast';
import RentModal from './modals/RentModal';
import SearchModal from './modals/SearchModal';

interface Props {
  children: React.ReactNode;
}

/**
 * Client Component Provider
 */
export default function ClientProvider({ children }: Props) {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <RentModal />
      <SearchModal />
      <Toaster />

      {children}
    </>
  );
}
