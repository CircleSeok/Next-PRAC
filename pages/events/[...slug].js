import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/events/results-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';
import { getFilteredEvents } from '@/helpers/api-util';
import { useRouter } from 'next/router';

function FilteredEventPage(props) {
  const router = useRouter();

  // const filterDate = router.query.slug;

  // if (!filterDate) {
  //   return <p className='center'>Loading ... </p>;
  // }

  // const filteredYear = filterDate[0];
  // const filteredMonth = filterDate[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if (props.hasError) {
    return (
      <>
        <ErrorAlert>
          <p>유효한 값을 입력하세요.</p>
        </ErrorAlert>

        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>입력한 값의 이벤트가 없습니다.</p>
        </ErrorAlert>

        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

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
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: 'error',
      // },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FilteredEventPage;
