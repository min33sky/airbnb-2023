'use client';

import React from 'react';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';

interface Props {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: Props) {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      {children}
    </>
  );
}
