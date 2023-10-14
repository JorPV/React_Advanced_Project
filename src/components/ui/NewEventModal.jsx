// NewEventModal.jsx
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
import React from "react";
import { NewEventForm } from "../NewEventForm";

const NewEventModal = ({ isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create your account</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<NewEventForm />
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3}>
						Save
					</Button>
					<Button onClick={onClose}>Cancel</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default NewEventModal;
