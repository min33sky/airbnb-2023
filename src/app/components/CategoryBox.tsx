'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';

interface Props {
  icon: IconType;
  label: string;
  selected?: boolean;
}

export default function CategoryBox({
  icon: Icon,
  label,
  selected = false,
}: Props) {
  const router = useRouter();
  // const params = useSearchParams();

  // console.log('## params', params);

  const handleClick = useCallback(() => {
    // let currentQuery = {};

    // if (params) {
    //   currentQuery = qs.parse(params.toString())
    // }

    // const updatedQuery: any = {
    //   ...currentQuery,
    //   category: label
    // }

    // if (params?.get('category') === label) {
    //   delete updatedQuery.category;
    // }

    // const url = qs.stringifyUrl({
    //   url: '/',
    //   query: updatedQuery
    // }, { skipNull: true });

    router.push(`/?category=${label}`);
  }, [label, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer select-none flex-col items-center justify-center gap-2 border-b-2
                p-3 transition hover:text-neutral-800
                ${
                  selected
                    ? 'border-b-neutral-800 text-neutral-800'
                    : 'border-transparent text-neutral-500'
                }
      `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
}
