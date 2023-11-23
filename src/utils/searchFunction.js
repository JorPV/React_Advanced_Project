export const searchEventsByTitle = (eventsData, searchText) => {
	const searchString = searchText ? searchText.toString() : "";

	if (!searchText) {
		return eventsData;
	}

	const filteredEvents = eventsData.filter((event) =>
		event.title.toLowerCase().includes(searchString.toLowerCase())
	);

	return filteredEvents;
};
