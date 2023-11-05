import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useEventContext } from "../context/EventsDataContext";

export const useCreateEvent = () => {
	const { updateEvents } = useEventContext();
	const [submitting, setSubmitting] = useState(false);
	const toast = useToast();

	const updateEvent = async (eventId, eventData, setIsOpen) => {
		setSubmitting(true);

		try {
			const response = await fetch(`http://localhost:3000/events/${eventId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(eventData),
			});
			const responseData = await response.json();
			console.log("Success:", responseData);
			setSubmitting(false);

			if (response.ok) {
				// Show a success toast
				toast({
					title: "Event updated.",
					description: "Your event has been successfully updated!",
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
				description: "There was an error updating the event.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return { submitting, updateEvent };
};