'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Container from '../Container';
import CategoryBox from '../CategoryBox';
import useDragScroll from '@/hooks/useDragScroll';
import { categories } from '@/utils/categories';
import ArrowButton from '../ArrowButton';

/**
 * 카테고리를 보여주는 컴포넌트입니다.
 * 메인페이지에서만 보여줍니다.
 */
export default function Categories() {
  const params = useSearchParams();
  const currentCategory = params?.get('category');
  const pathname = usePathname();
  const {
    onDragEnd,
    onDragMove,
    onDragStart,
    scrollRef,
    onClickArrow,
    isLeftEnd,
    isRightEnd,
  } = useDragScroll();

  //? 메인페이지에서만 카테고리를 보여준다.
  const isMainPage = pathname === '/';
  if (!isMainPage) return null;

  return (
    <Container>
      {!isLeftEnd && (
        <ArrowButton direction="left" onClick={() => onClickArrow('left')} />
      )}
      <div
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        className="flex items-center justify-between overflow-x-auto pb-2 pt-4 scrollbar-none hover:cursor-grab"
      >
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            icon={category.icon}
            label={category.label}
            selected={category.label === currentCategory}
          />
        ))}
      </div>
      {!isRightEnd && (
        <ArrowButton direction="right" onClick={() => onClickArrow('right')} />
      )}
    </Container>
  );
}
