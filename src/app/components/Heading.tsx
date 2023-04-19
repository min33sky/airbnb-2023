import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function Heading({ title, subtitle, center }: Props) {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <p className="text-2xl font-bold">{title}</p>
      <p className="mt-2 font-light text-neutral-500">{subtitle}</p>
    </div>
  );
}
