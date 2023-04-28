import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  listingId: string;
  currentUser?: SafeUser | null;
}

/**
 * Listing 좋아요를 관리하는 Hook
 * @returns hasFavorited: boolean, toggleFavorite: () => void
 */
export default function useFavorite({ listingId, currentUser }: Props) {
  const router = useRouter();

  const loginModal = useLoginModal();

  // 현재 사용자가 좋아요를 눌렀는지 여부를 반환
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        // recommend variables name

        if (hasFavorited) {
          // 좋아요 취소
          request = () =>
            fetch(`/api/favorites/${listingId}`, { method: 'DELETE' });
        } else {
          // 좋아요 누르기
          request = () =>
            fetch(`/api/favorites/${listingId}`, { method: 'POST' });
        }

        const result = await request();

        if (!result.ok) {
          throw new Error(`${hasFavorited ? '좋아요 취소' : '좋아요'} 실패}`);
        }
        router.refresh();
        toast.success(`${hasFavorited ? '좋아요 취소' : '좋아요'} 성공`);
      } catch (error) {
        console.log('##### 좋아요 관련 에러 : ', error);
        toast.error('좋아요 관련해서 문제가 생겼어요...');
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
}
