import Container from './components/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/listing/ListingCard';
import getCurrentUser from './utils/getCurrentUser';
import getListings, { IListingsParams } from './utils/getListings';

interface Props {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: Props) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 1) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div
        className="
            grid
            grid-cols-1
            gap-8
            pt-52
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
          "
      >
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
}
