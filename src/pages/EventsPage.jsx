import { Container, Box, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { EventsCard } from "../components/ui/EventsCard";
import { AddEventBtn } from "../components/ui/AddEventBtn";
import { useEventContext } from "../context/EventsDataContext";

export const loader = async () => {
	const events = await fetch("http://localhost:3000/events");
	return { events: await events.json() };
};

export const EventsPage = () => {
	const { events, updateEvents } = useEventContext();
	const [selectedActivity, setSelectedActivity] = useState(null);
	const [eventsData, setEventsData] = useState([]);
	const [categories, setCategories] = useState([]);
	const { events: initialEvents } = useLoaderData();

	const fetchEvents = async () => {
		try {
			const response = await fetch("http://localhost:3000/events");
			const data = await response.json();
			setEventsData(data); // Update the local events data
		} catch (error) {
			console.error("Error fetching events:", error);
		}
	};

	useEffect(() => {
		if (initialEvents) {
			setEventsData(initialEvents);
		} else {
			fetchEvents();
		}
	}, [initialEvents, updateEvents, eventsData]);

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await fetch("http://localhost:3000/categories");
			const data = await response.json();
			setCategories(data);
		};
		fetchCategories();
	}, []);

	if (!eventsData || eventsData.length === 0) {
		return <div>Loading...</div>;
	} else {
		return (
			<Container maxW="auto" bg="gray.50" centerContent mt="3em">
				<Box padding="4" bg="gray.50" color="black" w="80%">
					<Heading>List of activities</Heading>
					<AddEventBtn setEvents={fetchEvents} />
					<div>
						{eventsData.map((event) => (
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
	}
};
