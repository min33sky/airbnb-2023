import type { IconType } from 'react-icons';

interface Props {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

export default function Button({
  label,
  onClick,
  disabled = false,
  outline = false,
  small = false,
  icon: Icon,
}: Props) {
  return (
    <button
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`relative w-full rounded-lg transition disabled:cursor-not-allowed disabled:opacity-70
        hover:opacity-80
        ${
          outline
            ? 'border-black bg-white text-black'
            : 'border-rose-500 bg-rose-500 text-white'
        }
        ${
          small
            ? 'border-[1px] py-1 text-sm font-light'
            : 'text-md border-2 py-3 font-semibold'
        }
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
}
