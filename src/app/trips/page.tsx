import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import getCurrentUser from '@/utils/getCurrentUser';
import getReservations from '@/utils/getReservation';
import React from 'react';
import TripsClient from './TripsClient';

export default async function TripsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="You must be signed in to view this page."
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
}
