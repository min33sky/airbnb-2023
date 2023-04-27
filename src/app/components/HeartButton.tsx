'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import React from 'react';
import { SafeUser } from '../types';
import useFavorite from '@/hooks/useFavorite';

interface Props {
  listingId: string;
  currentUser?: SafeUser | null;
}

/**
 * 좋아요 버튼
 */
export default function HeartButton({ listingId, currentUser }: Props) {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <button
      onClick={toggleFavorite}
      className="relative transition hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </button>
  );
}
