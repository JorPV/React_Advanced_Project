import {
	useToast,
} from "@chakra-ui/react";

export const deleteEvent = async (id) => {
	const url = `http://localhost:3000/events/${id}`;
	// const url = `http://localhost:3000/users/${id}`;
	const toast = useToast();

	try {
		const response = await fetch(url, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		toast({
			title: "Event deleted",
			description: "Your activity has been succesfully deleted!",
			status: "success",
			duration: 9000,
			isClosable: true,
		});

		console.log("Object deleted successfully");

		// You may want to fetch the updated data after the delete request
		// fetchData();

		// Do something with the updated data
	} catch (error) {
		console.error("There was a problem with the DELETE request:", error);
		toast({
			title: "Error",
			description: "There was an error deleting the activity.",
			status: "error",
			duration: 9000,
			isClosable: true,
		});
	}
};

// 		// Call the function with the ID of the object you want to delete
deleteEvent(8);
