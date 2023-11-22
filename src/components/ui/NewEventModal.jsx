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
import { NewEventForm } from "../NewEventForm";

export const NewEventModal = ({ isOpen, onClose, onSubmit, setEvents }) => {

	const handleSubmit = async (data) => {
		try {
			const response = await onSubmit(data);
			if (response.ok) {
				setEvents(response); // Update or refresh the data
				onClose(); // Close the modal if the request was successful
			} else {
				// Handle error if the response is not okay
			}
		} catch (error) {
			// Handle any errors that occur during the POST request
		} 
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create your own activity</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<NewEventForm
						onSubmit={handleSubmit}
						setIsOpen={onClose}
						setEvents={setEvents}
					/>
				</ModalBody>

				<ModalFooter>
					<Button type="submit" form="eventForm" colorScheme="whatsapp" mr={3}>
						Create activity
					</Button>
					<Button onClick={onClose}>Cancel</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
