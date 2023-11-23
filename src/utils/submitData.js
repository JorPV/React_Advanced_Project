import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export const useCreateEvent = () => {
	const [submitting, setSubmitting] = useState(false);
	const [lastAddedId, setLastAddedId] = useState(null);
	const toast = useToast();
	let lastId;

	const createEvent = async (eventData, setIsOpen, setValue, setEvents) => {
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
			setLastAddedId(lastId);
			setValue("categoryIds", []); // Reset selectedCategories to an empty array
			setSubmitting(false);

			if (response.ok) {
				setEvents((prevEvents) => [...prevEvents, responseData]);

				// Show a success toast
				toast({
					title: "Event created.",
					description: "Your activity has been successfully added!",
					status: "success",
					duration: 7000,
					isClosable: true,
				});

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
				duration: 7000,
				isClosable: true,
			});
		}
	};

	return { submitting, lastAddedId, createEvent };
};
