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

export const EditEventModal = ({ isOpen, onClose, onUpdateEventData }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit this activity</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<EditEventForm
						setIsOpen={onClose}
						onUpdateEventData={onUpdateEventData}
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
