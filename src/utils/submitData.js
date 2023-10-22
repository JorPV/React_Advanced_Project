import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export const useCreateEvent = () => {
	const [submitting, setSubmitting] = useState(false);
	const [lastAddedId, setLastAddedId] = useState(null);
	const [data, setData] = useState([]);
	const toast = useToast();
    let lastId; 

	const createEvent = async (eventData, setShowModal, setValue) => {
		setSubmitting(true);

		try {
			const response = await fetch("http://localhost:3000/events", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(eventData),
			});
			const responseData = await response.json();
			console.log("Success:", responseData);
			setLastAddedId(lastId);
			setValue("categoryIds", []); // Reset selectedCategories to an empty array
			setSubmitting(false);

			if (response.ok) {
				// Fetch the updated data from the server
				const updatedResponse = await fetch("http://localhost:3000/events");
				const updatedData = await updatedResponse.json();
				// Update the data state with the new data
				setData(updatedData);

				// Show a success toast
				toast({
					title: "Event created.",
					description: "Your activity has been successfully added!",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			}
		} catch (error) {
			console.error("Error:", error);
			setSubmitting(false);

			toast({
				title: "Error",
				description: "There was an error creating the event.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return { submitting, lastAddedId, data, createEvent };
};


