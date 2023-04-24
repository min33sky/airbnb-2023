'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import Container from '../Container';
import CategoryBox from '../CategoryBox';
import { useCallback, useEffect, useRef, useState } from 'react';
import { map } from 'zod';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is has windmills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This is property has a beautiful pool!',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is near a lake!',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activies!',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is an ancient castle!',
  },
  {
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property offers camping activities!',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in arctic environment!',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert!',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in a barn!',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!',
  },
];

export default function Categories() {
  const params = useSearchParams();
  const currentCategory = params?.get('category');
  const pathname = usePathname();

  // TODO: Drag to scroll

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);

  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    if (!scrollRef.current) return;

    setIsDrag(true);
    // 스크롤이 이동된 상태에서 클릭 시 위치 계산하기위해
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
