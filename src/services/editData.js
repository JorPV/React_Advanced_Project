import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useEventContext } from "../context/EventsDataContext";

export const useEditEvent = () => {
	const { updateEvents } = useEventContext();
	const [submitting, setSubmitting] = useState(false);
	const toast = useToast();

	const updateData = async (eventId, data) => {
		console.log("Updating data:", data, "Event ID:", eventId);
		setSubmitting(true);

		try {
			const response = await fetch(`http://localhost:3000/events/${eventId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			console.log("Success:", responseData);
			setSubmitting(false);

			if (response.ok) {
				// Show a success toast
				toast({
					title: "Data updated.",
					description: "Your data has been successfully updated!",
					status: "success",
					duration: 9000,
					isClosable: true,
				});

				// Call updateEvents to update the context
				updateEvents(responseData);
			} else {
				// Show an error toast
				toast({
					title: "Error",
					description: "There was an error updating the data.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			}
		} catch (error) {
			console.error("Error:", error);
			setSubmitting(false);

			// Show an error toast
			toast({
				title: "Error",
				description: "There was an error updating the data.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return { submitting, updateEvent: updateData };
};