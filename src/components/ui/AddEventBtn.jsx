import { Button as NewEventBtn } from "@chakra-ui/react";
import React, { useState } from "react";
import { NewEventModal } from "./NewEventModal";

export const AddEventBtn = () => {
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
				colorScheme={"purple"}
				onClick={handleOpen}
				mt="1em"
			>
				Add new activity
			</NewEventBtn>
			<NewEventModal isOpen={isOpen} onClose={handleClose} />
		</>
	);
};
