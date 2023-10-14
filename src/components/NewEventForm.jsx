// NewEventForm.jsx
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

export const NewEventForm = () => {
	return (
		<>
			<FormControl>
				<FormLabel>First name</FormLabel>
				<Input placeholder="First name" />
			</FormControl>

			<FormControl mt={4}>
				<FormLabel>Last name</FormLabel>
				<Input placeholder="Last name" />
			</FormControl>
		</>
	);
};

