import { Heading } from "@chakra-ui/react";
import { Button as DeleteButton } from "@chakra-ui/react";
// import { useLoaderData } from 'react-router-dom';

export const loader = async ({ params }) => {
	const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
	return {
		event: await event.json(),
	};
};

export const EventPage = ({ deleteActivity }) => {
	// const { event } = useLoaderData();
	return (
		<>
			<Heading>Event pagina: </Heading>
			<DeleteButton onClick={deleteActivity}>Delete event</DeleteButton>
		</>
	);
};
