import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export const useEditEvent = () => {
	const [submitting, setSubmitting] = useState(false);
	const toast = useToast();

	const updateData = async (eventId, data) => {
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
			setSubmitting(false);

			if (response.ok) {
				toast({
					title: "Data updated.",
					description: "Your data has been successfully updated!",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
                return responseData;
			} else {
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

			toast({
				title: "Error",
				description: "There was an error updating the data.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
            throw error;
		}
	};

	return { submitting, updateEvent: updateData };
};