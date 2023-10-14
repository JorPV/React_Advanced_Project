import { Heading } from '@chakra-ui/react';
// import { useLoaderData } from 'react-router-dom';

export const loader = async ({ params }) => {
	const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
	return {
		event: await event.json(),
	};
};

export const EventPage = ( ) => {
    // const { event } = useLoaderData();
  return <Heading>Event pagina: </Heading>;
};
