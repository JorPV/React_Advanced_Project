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
import { useEditEvent } from "../../services/editData";

export const EditEventModal = ({ isOpen, onClose }) => {
	const { updateEvent } = useEditEvent();

	const handleUpdate = async (eventId, data) => {
        // console.log("handleUpdate called!", eventId, data);
		try {
			await updateEvent(eventId, data);
			onClose(); // Close the modal if the request was successful
		} catch (error) {
			console.error("Error during handleUpdate:", error);
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
						handleUpdate={handleUpdate}
						setIsOpen={onClose}
						updateEvent={updateEvent}
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
