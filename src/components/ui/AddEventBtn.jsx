import { Button as NewEventBtn, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { NewEventModal } from "./NewEventModal";

export const AddEventBtn = ({ setEvents }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<NewEventBtn
				variant="solid"
				colorScheme="purple"
				onClick={handleOpen}
				mt="5"
				size={{ base: "md", md: "md", lg: "lg" }}
			>
				<Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
					Add new activity
				</Text>
			</NewEventBtn>
			<NewEventModal
				isOpen={isOpen}
				onClose={handleClose}
				setEvents={setEvents}
			/>
		</>
	);
};
