import EventList from '@/components/events/event-list';
import EventSearch from '@/components/events/event-search';
import { getAllEvents } from '@/dummy-data';

function AllEventPage() {
  const events = getAllEvents();

  return (
    <>
      <EventSearch />
      <EventList items={events} />
    </>
  );
}

export default AllEventPage;
