'use client';

import { SafeListing, SafeReservation, SafeUser } from '@/types';
import { categories } from '@/utils/categories';
import useLoginModal from '@/hooks/useLoginModal';
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { toast } from 'react-hot-toast';
import Container from '@/components/Container';
import ListingHead from '@/components/listing/ListingHead';
import ListingInfo from '@/components/listing/ListingInfo';
import ListingReservation from '@/components/listing/ListingReservation';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};
interface Props {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

export default function ListingClient({
  reservations = [],
  listing,
  currentUser,
}: Props) {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      console.log('##### disabledDate range: ', range);

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(
    () => categories.find((items) => items.label === listing.category),
    [listing.category],
  );

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listingId: listing.id,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error('예약을 생성하는데 실패했습니다.');
      }

      toast.success('예약을 생성했습니다.');
      setDateRange(initialDateRange);
      router.push('/trips');
    } catch (error) {
      console.log('##### error: ', error);
      toast.error('예약을 생성하는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing.id,
    loginModal,
    router,
    totalPrice,
  ]);

  /**
   * @description 예약 날짜가 변경되면 총 가격을 다시 계산한다.
   */
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={listing.user}
              description={listing.description}
              guestCount={listing.guestCount}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              category={category}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                dateRange={dateRange}
                totalPrice={totalPrice}
                onChangeDate={setDateRange}
                onSubmit={onCreateReservation}
                disabledDates={disabledDates}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
