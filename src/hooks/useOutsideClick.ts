import { useEffect, useRef } from 'react';

/**
 * 특정 DOM 외부의 클릭 여부를 판단하는 Hook
 * @param handler 지정한 ref 범위 밖을 클릭 시 실행할 핸들러
 * @returns ref
 */
export default function useOutsideClick(handler: (...arg: any) => void) {
  const ref = useRef<HTMLDivElement>(null); // 감지할 DOM의 ref

  useEffect(() => {
    const clickCheckListener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener('click', clickCheckListener);

    return () => {
      document.removeEventListener('click', clickCheckListener);
    };
  }, [handler]);

  return ref;
}
