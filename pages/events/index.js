import EventList from '@/components/events/event-list';
import EventSearch from '@/components/events/event-search';
import { getAllEvents } from '@/dummy-data';
import { useRouter } from 'next/router';

function AllEventPage() {
  const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <EventSearch onSerch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export default AllEventPage;
