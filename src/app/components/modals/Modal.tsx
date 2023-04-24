'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactNode; // ? React.ReactElement
  footer?: React.ReactNode; // ? React.ReactElement
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

export default function Modal({
  isOpen = false,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled = false,
  secondaryAction,
  secondaryActionLabel,
}: Props) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    console.log(
      'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    );
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <article
        className="fixed inset-0 z-50 flex items-center justify-center
        overflow-x-hidden overflow-y-hidden bg-neutral-800/70 outline-none focus:outline-none"
      >
        <div onClick={handleClose} className="fixed inset-0">
          <p className="sr-only">모달 닫기 영역</p>
        </div>

        <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
          {/*content*/}
          <div
            className={`translate h-full duration-300 ${
              showModal
                ? 'translate-y-0 opacity-100'
                : 'translate-y-20 opacity-0'
            }`}
          >
            <div
              className="translate relative flex h-full w-full flex-col
                rounded-lg border-0 bg-white shadow-lg outline-none
                focus:outline-none md:h-auto lg:h-auto
                "
            >
              {/*header*/}
              <header className="relative flex items-center justify-center rounded-t border-b-[1px] p-6">
                <button
                  className="absolute left-9 border-0 p-1 transition hover:opacity-70"
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </header>

              {/*body*/}
              <div className="relative flex-auto p-6">{body}</div>

              {/*footer*/}
              <footer className="flex flex-col gap-2 p-6">
                <div className="flex w-full items-center gap-4">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </footer>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
