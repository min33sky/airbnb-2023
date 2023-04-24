'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Container from '../Container';
import CategoryBox from '../CategoryBox';
import useDragScroll from '@/hooks/useDragScroll';
import { categories } from '@/app/utils/categories';

export default function Categories() {
  const params = useSearchParams();
  const currentCategory = params?.get('category');
  const pathname = usePathname();
  const { onDragEnd, onDragMove, onDragStart, scrollRef } = useDragScroll();

  //? 메인페이지에서만 카테고리를 보여준다.
  const isMainPage = pathname === '/';
  if (!isMainPage) return null;

  return (
    <Container>
      <div
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        className="flex items-center justify-between overflow-x-auto pb-2 pt-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 hover:cursor-grab"
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
    </Container>
  );
}
