import { createContext, useState } from "react";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
	const [eventsContext, setEventsContext] = useState({});

	return (
		<EventsContext.Provider value={{ eventsContext, setEventsContext }}>
			{children}
		</EventsContext.Provider>
	);
};
