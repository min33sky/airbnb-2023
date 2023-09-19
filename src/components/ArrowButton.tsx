import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface Props {
  direction: 'left' | 'right';
  onClick: () => void;
}

export default function ArrowButton({ direction, onClick }: Props) {
  const Icon = direction === 'left' ? FaArrowLeft : FaArrowRight;

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 z-50 -translate-y-1/2 rounded-full border p-2 opacity-30 transition hover:bg-slate-200 hover:opacity-80 ${
        direction === 'left' ? 'left-1' : 'right-1'
      }`}
    >
      <Icon size={24} className="text-slate-400 hover:text-slate-50" />
    </button>
  );
}
