import React from 'react';
import { IconType } from 'react-icons';

interface Props {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

export default function CategoryInput({
  icon: Icon,
  label,
  selected,
  onClick,
}: Props) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex cursor-pointer flex-col gap-3 rounded-xl
        border-2 p-4 transition hover:border-black
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
}
