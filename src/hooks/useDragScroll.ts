import { useCallback, useRef, useState } from 'react';

/**
 * 스크롤바가 생기는 컴포넌트에서 드래그로 스크롤을 이동시키는 훅
 */
export default function useDragScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 드래그 중인지 여부
  const [isDrag, setIsDrag] = useState(false);

  // 스크롤바를 클릭한 위치
  const [startX, setStartX] = useState(0);

  // 스크롤바가 양 끝에 위치하는지 여부
  const [isLeftEnd, setIsLeftEnd] = useState(true);
  const [isRightEnd, setIsRightEnd] = useState(false);

  /**
   * 드래그 시작시 스크롤바를 클릭한 위치를 저장하는 함수
   */
  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    if (!scrollRef.current) return;

    setIsDrag(true);
    //? 스크롤이 이동된 상태에서 클릭 시 위치를 계산하기위해
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  }, []);

  /**
   * 드래그 종료시 드래그 여부를 false로 변경하는 함수
   */
  const onDragEnd = useCallback(() => {
    setIsDrag(false);
  }, []);

  /**
   * 드래그 중일때 스크롤바를 이동시키는 함수
   */
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

      //? 스크롤바가 양 끝에 위치하는지 여부를 확인
      setIsLeftEnd(scrollLeft === 0);
      setIsRightEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    },
    [isDrag, startX],
  );

  /**
   * 버튼 클릭시 스크롤바를 이동시켜주는 함수
   */
  const onClickArrow = useCallback(
    (direction: 'left' | 'right', movePx: number = 100) => {
      if (!scrollRef.current) return;

      scrollRef.current.scrollLeft += direction === 'left' ? -movePx : movePx;
    },
    [],
  );

  return {
    scrollRef,
    onDragStart,
    onDragEnd,
    onDragMove,
    onClickArrow,
    isLeftEnd,
    isRightEnd,
  };
}
