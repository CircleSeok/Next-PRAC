import EventList from '@/components/events/event-list';
import { getFilteredEvents } from '@/dummy-data';
import { useRouter } from 'next/router';

function FilteredEventPage() {
  const router = useRouter();

  const filterDate = router.query.slug;

  if (!filterDate) {
    return <p className='center'>Loading ... </p>;
  }

  const filteredYear = filterDate[0];
  const filteredMonth = filterDate[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>유효한 값을 입력하세요.</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>입력한 값의 이벤트가 없습니다.</p>;
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventPage;
