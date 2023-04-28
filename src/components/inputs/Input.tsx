'use client';

import React from 'react';
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface Props {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register?: UseFormRegisterReturn;
  errors: FieldErrors;
}

export default function Input({
  id,
  label,
  type = 'text',
  disabled = false,
  formatPrice = false,
  register,
  required,
  errors,
}: Props) {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            absolute
            left-2
            top-5
            text-neutral-700
          "
        />
      )}
      <input
        id={id}
        {...(register ?? {})}
        disabled={disabled}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          rounded-md
          border-2
          bg-white
          p-4
          pt-6
          font-light
          outline-none
          transition
          disabled:cursor-not-allowed
          disabled:opacity-70
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
      <label
        className={`
          text-md
          absolute
          top-5
          z-10
          origin-[0]
          -translate-y-3
          transform
          duration-150
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100
          peer-focus:-translate-y-4
          peer-focus:scale-75
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
      {errors[id] && (
        <p className="absolute right-2 top-1/2 -translate-y-1/2 pt-1 text-sm text-rose-500">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </div>
  );
}
