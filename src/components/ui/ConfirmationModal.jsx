import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Text,
	Flex,
	ModalFooter,
	useToast,
} from "@chakra-ui/react";
import { deleteEvent } from "../../services/deleteData";
// import { useNavigate } from "react-router-dom";

export const ConfirmationModal = ({ isOpen, onClose, eventId }) => {
	const toast = useToast();
	// const navToEvents = useNavigate();

	const handleDelete = async () => {
		try {
			await deleteEvent(eventId);
			toast({
				title: "Event deleted",
				description: "Your activity has been succesfully deleted!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			setTimeout(() => {
				onClose();
				// navToEvents.push("/");
			}, 1000);
		} catch (error) {
			toast({
				title: "Error",
				description: "There was an error deleting the activity.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};
	return (
		<>
			<Modal
				closeOnOverlayClick={false}
				onClose={onClose}
				isOpen={isOpen}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Delete activity</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>Are you sure you want to delete this activity?</Text>
					</ModalBody>
					<ModalFooter>
						<Flex gap="5">
							<Button variant="outline" onClick={handleDelete}>
								Yes, delete!
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</Flex>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
