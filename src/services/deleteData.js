export const deleteEvent = async (id) => {
	const url = `http://localhost:3000/events/${id}`;
	// const url = `http://localhost:3000/users/${id}`;

	try {
		await fetch(url, {
			method: "DELETE",
		});
	} catch (error) {
		console.error("There was a problem with the DELETE request:", error);
	}
};

// Call the function with the ID of the object you want to delete
// deleteEvent(8);
