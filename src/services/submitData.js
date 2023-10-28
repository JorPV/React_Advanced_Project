import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useEventContext } from "../context/EventsDataContext";

export const useCreateEvent = () => {
	const { updateEvents } = useEventContext();
	const [submitting, setSubmitting] = useState(false);
	const [lastAddedId, setLastAddedId] = useState(null);
	// const [data, setData] = useState([]);
	const toast = useToast();
	let lastId;

	const createEvent = async (eventData, setIsOpen, setValue) => {
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
				// Show a success toast
				toast({
					title: "Event created.",
					description: "Your activity has been successfully added!",
					status: "success",
					duration: 9000,
					isClosable: true,
				});

				// Call updateEvents to update the events context
				updateEvents(responseData);

				// Close the modal after 2 seconds
				setTimeout(() => {
					setIsOpen(false);
				}, 2000);
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

	return { submitting, lastAddedId, createEvent };
};
