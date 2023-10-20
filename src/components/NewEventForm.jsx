import {
	FormControl,
	FormLabel,
	Input,
	CheckboxGroup,
	Stack,
	Checkbox,
	Text,
	InputGroup,
	InputLeftAddon,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { submitData } from "../utils/submitData";

export const NewEventForm = ({ setIsOpen, setEvents }) => {
	const [data, setData] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [lastAddedId, setLastAddedId] = useState(null);
	const toast = useToast();
	let lastId;

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const fetchData = async () => {
		try {
			const response = await fetch("http://localhost:3000/events");
			const data = await response.json();
			setData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

  const handleSubmitData = async (data) => {
		await submitData(
			data,
			lastId,
			setSubmitting,
			setValue,
			setLastAddedId,
			setIsOpen,
			setEvents,
			toast,
			fetchData
		);
	};

	const deleteEvent = async (id) => {
		const url = `http://localhost:3000/events/${id}`;
		// const url = `http://localhost:3000/users/${id}`;
		const toast = useToast();

		try {
			const response = await fetch(url, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			toast({
				title: "Event deleted",
				description: "Your activity has been succesfully deleted!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});

			console.log("Object deleted successfully");

			// You may want to fetch the updated data after the delete request
			// fetchData();

			// Do something with the updated data
		} catch (error) {
			console.error("There was a problem with the DELETE request:", error);
			toast({
				title: "Error",
				description: "There was an error deleting the activity.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	// 		// Call the function with the ID of the object you want to delete
	// deleteEvent(8);

	return (
		<>
			<form onSubmit={handleSubmit(handleSubmitData)} id="eventForm">
				{/* To do: add the isRequired attribute to each form control */}
				<FormControl>
					<FormLabel>Name</FormLabel>
					<Input
						{...register("name", { required: "Name is required" })}
						placeholder="Your name"
						name="name"
					/>
					<Text color="tomato">{errors?.name && errors.name.message}</Text>
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>Activity title</FormLabel>
					<Input
						{...register("title")}
						placeholder="The name of the activity"
						name="title"
					/>
					<Text color="tomato">{errors?.name && errors.name.message}</Text>
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>Description</FormLabel>
					<Input
						{...register("description")}
						placeholder="Brief description"
						name="description"
					/>
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>Location</FormLabel>
					<Input
						{...register("location")}
						placeholder="Where will the activity take place"
						name="location"
					/>
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>Start time</FormLabel>
					<Input
						placeholder="Select Date and Time"
						type="datetime-local"
						name="startTime"
						{...register("startTime")}
					/>
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>End time</FormLabel>
					<Input
						name="endTime"
						{...register("endTime")}
						placeholder="Select Date and Time"
						type="datetime-local"
					/>
				</FormControl>

				<FormControl mt={4} mb={4}>
					<FormLabel>Choose one or more categories</FormLabel>
					<CheckboxGroup colorScheme="green">
						<p>{errors.categoryIds?.message}</p>
						<Stack spacing={[1, 5]} direction={["column", "row"]}>
							<Checkbox value="1" name="sports" {...register("sports")}>
								Sports
							</Checkbox>
							<Checkbox value="2" name="games" {...register("games")}>
								Games
							</Checkbox>
							<Checkbox value="3" name="relaxation" {...register("relaxation")}>
								Relaxation
							</Checkbox>
						</Stack>
					</CheckboxGroup>
				</FormControl>

				<FormControl>
					<FormLabel>Add a picture:</FormLabel>
					{/* <input
						type="file"
						{...register("img")}
						accept="image/png, image/jpeg"
					/> */}
					<InputGroup size="sm">
						<InputLeftAddon children="https://" />
						<Input placeholder="Image url" {...register("image")} />
					</InputGroup>
				</FormControl>
			</form>
		</>
	);
};
