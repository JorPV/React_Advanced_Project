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
	const handleSubmitError = (errorMessage) => {
		console.error("Submit error:", errorMessage);
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: "10rem",
				}}
			>
				<h1 style={{ fontSize: "42px" }}>
					It seems that something went wrong... Try again!
				</h1>
			</div>
		);
	};

	const handleSubmit = async (data) => {
		try {
			const response = await onSubmit(data);
			if (response.ok) {
				setEvents(response);
				onClose();
			} else {
				handleSubmitError(response.error);
			}
		} catch (error) {
			handleSubmitError(error.message);
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
