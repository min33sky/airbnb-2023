import { useCallback, useRef, useState } from 'react';

export default function useDragScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);

  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    if (!scrollRef.current) return;

    setIsDrag(true);
    //? 스크롤이 이동된 상태에서 클릭 시 위치를 계산하기위해
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  }, []);

  const onDragEnd = useCallback(() => {
    setIsDrag(false);
  }, []);

  const onDragMove = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      if (!isDrag || !scrollRef.current) return;

      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;

      //? 드래그 방향과 스크롤 이동 방향이 반대이므로 마이너스
      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    },
    [isDrag, startX],
  );

  return {
    scrollRef,
    onDragStart,
    onDragEnd,
    onDragMove,
  };
}
