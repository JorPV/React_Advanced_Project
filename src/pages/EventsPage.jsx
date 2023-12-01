import {
	Container,
	Box,
	Center,
	Heading,
	Text,
	Flex,
	Grid,
	Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { EventsCard } from "../components/ui/EventsCard";
import { AddEventBtn } from "../components/ui/AddEventBtn";
import { useEventContext } from "../context/EventsDataContext";
import { SearchInput } from "../components/ui/SearchInput";
import { FilterSelect } from "../components/ui/FilterSelect";

export const loader = async () => {
	const events = await fetch("http://localhost:3000/events");
	return { events: await events.json() };
};

export const EventsPage = () => {
	const { categories } = useEventContext();
	const [selectedActivity, setSelectedActivity] = useState(null);
	const [events, setEvents] = useState([]);
	const { events: initialEvents } = useLoaderData();
	const [searchText, setSearchText] = useState("");
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [error, setError] = useState(null);

	const fetchEvents = async () => {
		try {
			const response = await fetch("http://localhost:3000/events");
			const data = await response.json();
			setEvents(data);
		} catch (error) {
			console.error("Error fetching events:", error);
			setError("Error loading the activities. Please try again later.");
		}
	};

	useEffect(() => {
		if (initialEvents) {
			setEvents(initialEvents);
		} else {
			fetchEvents();
		}
	}, [initialEvents, setEvents]);

	const filterEvents = (events, category, searchText) => {
		let filteredEvents = events;

		if (category) {
			filteredEvents = filteredEvents.filter((event) =>
				event.categoryIds.includes(category)
			);
		}

		if (searchText) {
			filteredEvents = filteredEvents.filter((event) =>
				event.title.toLowerCase().includes(searchText.toLowerCase())
			);
		}

		return filteredEvents;
	};

	if (!events || events.length === 0) {
		return (
			<Center mt="20em">
				<Spinner size="lg" m="4" />
				<Heading fontWeight="thin">Loading...</Heading>
			</Center>
		);
	} else {
		const filteredEvents = filterEvents(events, selectedCategory, searchText);

		return (
			<Container maxW="auto" bg="gray.50" minHeight="100vh" centerContent>
				<Box padding="4" bg="gray.50" color="black" w="85%">
					<Flex
						flexDirection={{ base: "column-reverse", lg: "row" }}
						justifyContent={{ base: "start", lg: "space-between" }}
						alignItems={{ base: "end", lg: "center" }}
					>
						<Text
							as="h2"
							alignSelf="start"
							justifySelf="center"
							fontSize={{ base: "2.5rem", md: "3.5rem", lg: "4rem" }}
							my={{ base: "7", md: "10", lg: "12" }}
							color="#0d445e"
							fontWeight={{ base: "bold" }}
						>
							All activities
						</Text>
						<AddEventBtn setEvents={setEvents} />
					</Flex>
					<Flex
						gap="12"
						flexDirection={{ base: "column", lg: "row" }}
						justifyContent={{ base: "start", lg: "space-between" }}
						alignItems={{ base: "end", lg: "center" }}
					>
						{categories && categories.length > 0 ? (
							<FilterSelect
								categories={categories}
								setSelectedCategory={setSelectedCategory}
							/>
						) : null}
						<SearchInput
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</Flex>
					<Grid
						templateColumns={{
							base: "repeat(1, 1fr)",
							xl: "repeat(2, 1fr)",
						}}
						gap={8}
						my={8}
					>
						{filteredEvents.map((event) => (
							<Link key={event.id} to={`event/${event.id}`}>
								<EventsCard
									event={event}
									categories={categories}
									onClick={() => setSelectedActivity(event)}
								></EventsCard>
							</Link>
						))}
					</Grid>
					{/* Display the error message if there is an error */}
					{error && (
						<Center mt="10rem">
							<Heading fontSize="42px">{error}</Heading>
						</Center>
					)}
				</Box>
			</Container>
		);
	}
};
