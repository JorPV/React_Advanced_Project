import { Container, Box, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { EventsCard } from "../components/ui/EventsCard";
import { AddEventBtn } from "../components/ui/AddEventBtn";

export const loader = async () => {
	const events = await fetch("http://localhost:3000/events");
	return { events: await events.json() };
};

export const EventsPage = () => {
	const [selectedActivity, setSelectedActivity] = useState(null);
	const [events, setEvents] = useState([]);
	const [categories, setCategories] = useState([]);
	const { events: initialEvents } = useLoaderData();

	useEffect(() => {
		if (initialEvents) {
			setEvents(initialEvents);
		} else {
			const fetchEvents = async () => {
				const response = await fetch("http://localhost:3000/events");
				const data = await response.json();
				setEvents(data);
			};
			fetchEvents();
		}
	}, [initialEvents]);

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await fetch("http://localhost:3000/categories");
			const data = await response.json();
			setCategories(data);
		};
		fetchCategories();
	}, []);

	if (events.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<Container maxW="auto" bg="gray.50" centerContent mt="3em">
			<Box padding="4" bg="gray.50" color="black" w="80%">
				<Heading>List of activities</Heading>
				<AddEventBtn />
				<div>
					{events.map((event) => (
						<Link key={event.id} to={`event/${event.id}`}>
							<EventsCard
								event={event}
								categories={categories}
								onClick={() => setSelectedActivity(event)}
							></EventsCard>
						</Link>
					))}
				</div>
			</Box>
		</Container>
	);
};
