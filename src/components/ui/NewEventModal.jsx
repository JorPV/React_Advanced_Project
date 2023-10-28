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

	const handleSubmit = (data) => {
		onSubmit(data);
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
					<Button type="submit" form="eventForm" colorScheme="cyan" mr={3}>
						Submit
					</Button>
					<Button onClick={onClose}>Cancel</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
