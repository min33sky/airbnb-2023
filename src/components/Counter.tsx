'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface Props {
  title: string;
  subtitle: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export default function Counter({
  title,
  subtitle,
  value,
  min = 1,
  max = 20,
  onChange,
}: Props) {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onSubtract = useCallback(() => {
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <article className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>

      <div className="flex flex-row items-center gap-4">
        <button
          aria-label="Subtract Button"
          disabled={value === min}
          onClick={onSubtract}
          className="flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-neutral-400
          text-neutral-600 transition disabled:cursor-not-allowed disabled:bg-slate-300 hover:opacity-80 disabled:hover:opacity-100
          active:bg-rose-400 active:text-white disabled:active:bg-slate-300 disabled:active:text-neutral-600"
        >
          <AiOutlineMinus />
        </button>

        <p className="w-8 select-none text-center text-xl font-light text-neutral-600">
          {value}
        </p>

        <button
          aria-label="Add Button"
          disabled={value === max}
          onClick={onAdd}
          className="flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-neutral-400
          text-neutral-600 transition disabled:cursor-not-allowed disabled:bg-slate-300 hover:opacity-80 disabled:hover:opacity-100
          active:bg-rose-400 active:text-white disabled:active:bg-slate-300 disabled:active:text-neutral-600"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </article>
  );
}
