import { createContext, useState, useContext } from "react";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
	const [events, setEvents] = useState([]);
	// const [categories, setCategories] = useState([]);

	const updateEvents = (data) => {
		setEvents(data);
	};

	return (
		<EventsContext.Provider value={{ events, updateEvents }}>
			{children}
		</EventsContext.Provider>
	);
};

export const useEventContext = () => useContext(EventsContext);