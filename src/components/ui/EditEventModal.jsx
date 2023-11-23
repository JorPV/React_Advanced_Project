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
import { useState } from "react";

export const EditEventModal = ({
	isOpen,
	onClose,
	initialEventData,
	// updatedData,
}) => {
	const { updateEvent } = useEditEvent();
	const [updatedEventData, setUpdatedEventData] = useState(initialEventData);

	const handleUpdate = async (eventId, data) => {
		try {
			const updatedEvent = await updateEvent(eventId, data);
			// setUpdatedEventData(updatedData);

			// setUpdatedEventData(data);
			// setUpdateEvent(data);
			setUpdatedEventData(updatedEvent);
			onClose();
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
						// updateEvent={updateEvent}
						// initialEventData={initialEventData}
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
