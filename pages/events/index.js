import EventList from '@/components/events/event-list';
import EventSearch from '@/components/events/event-search';
import { getAllEvents } from '@/helpers/api-util';
import { useRouter } from 'next/router';

function AllEventPage(props) {
  const events = props.events;
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

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventPage;
