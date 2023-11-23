export const deleteEvent = async (id) => {
	const urlEventId = `http://localhost:3000/events/${id}`;
	// const urlUserId = `http://localhost:3000/users/${id}`;
	try {
		await fetch(urlEventId, {
			method: "DELETE",
		});
	} catch (error) {
		console.error("There was a problem with the DELETE request:", error);
		return error;
	}
};