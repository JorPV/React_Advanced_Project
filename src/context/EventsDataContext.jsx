import { createContext, useEffect, useState, useContext } from "react";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
	const [events, setEvents] = useState([]);
	const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);

	// const updateEvents = (newEvents) => {
    //     console.log("Updating events:", newEvents);
	// 	setEvents(newEvents);
	// };

	const fetchCategories = async () => {
		try {
			const response = await fetch("http://localhost:3000/categories");
			const data = await response.json();
			setCategories(data);
		} catch (error) {
			console.error("Error fetching categories:", error);
            return (
							<div>
								<h2>There was an error fetching categories</h2>
							</div>
						);
		}
	};
	const fetchUsers = async () => {
		try {
			const response = await fetch("http://localhost:3000/users");
			const data = await response.json();
			setUsers(data);
		} catch (error) {
			console.error("Error fetching users:", error);
            return (
							<div>
								<h2>There was an error fetching users</h2>
							</div>
						);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		fetchUsers();
	}, []);


	return (
		<EventsContext.Provider value={{ events, setEvents, categories, users }}>
			{children}
		</EventsContext.Provider>
	);
};

export const useEventContext = () => useContext(EventsContext);
