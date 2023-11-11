import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { EditEventForm } from "../EditEventForm";

export const EditEventModal = ({ isOpen, onClose, setEvents }) => {
	const handleUpdate = async (patchData) => {
		try {
			// Assuming onSubmit is an async function that makes the PATCH request
			const response = await handleUpdateEvent(eventId, patchData);
			if (response.ok) {
				setEvents(); // Update or refresh the data here
				onClose(); // Close the modal if the request was successful
			} else {
				// Handle error if the response is not okay
			}
		} catch (error) {
			// Handle any errors that occur during the PATCH request
		}
	};

const handleUpdateEvent = async (eventId, data) => {
	try {
		// Make the PATCH request here
		const response = await fetch(`http://localhost:3000/events/${eventId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		// Return the response for further processing in handleUpdate
		return response;
	} catch (error) {
		// Handle any errors that occur during the PATCH request
		console.error("Error:", error);
	}
};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit this activity</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<EditEventForm
						handleUpdate={handleUpdateEvent}
						setIsOpen={onClose}
						setEvents={setEvents}
					/>
				</ModalBody>

				<ModalFooter>
					<Button
						type="submit"
						form="updateForm"
						colorScheme="cyan"
						variant="outline"
						leftIcon={<CheckIcon />}
						mr={3}
					>
						Apply changes
					</Button>
					<Button onClick={onClose} colorScheme="orange" variant="outline">
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
