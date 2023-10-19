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
import { useState } from "react";

export const NewEventForm = ({ showModal, setShowModal }) => {
	const [data, setData] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [lastAddedId, setLastAddedId] = useState(null);
	const toast = useToast();

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		setSubmitting(true);
		let lastId;
		let userId;
		if (data.name) {
			const usersResponse = await fetch("http://localhost:3000/users");
			const usersData = await usersResponse.json();

			// Find if the user already exists
			const existingUser = usersData.find((user) => user.name === data.name);
			if (existingUser) {
				userId = existingUser.id;
			} else {
				const userResponse = await fetch("http://localhost:3000/users", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: data.name,
						image: data.image,
					}),
				});
				const userData = await userResponse.json();
				userId = userData.id;
			}
		}
        lastId++;

		// Create an array of categories and add the selected options.
		const selectedCategories = [];
		if (data.sports) {
			selectedCategories.push(parseInt("1"));
		}
		if (data.games) {
			selectedCategories.push(parseInt("2"));
		}
		if (data.relaxation) {
			selectedCategories.push(parseInt("3"));
		}


		const formattedData = {
			id: lastId,
			createdBy: userId,
			title: data.title,
			description: data.description,
			image: data.image, // Assuming 'img' is a URL
			categoryIds: selectedCategories,
			location: data.location,
			startTime: data.startTime,
			endTime: data.endTime,
		};

		try {
			const response = await fetch("http://localhost:3000/events", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formattedData),
			});
			const responseData = await response.json();
			console.log("Success:", responseData);
			setValue("categoryIds", []); // Reset selectedCategories to an empty array
			setSubmitting(false);
			setLastAddedId(lastId);

			if (response.ok) {
				// Fetch the updated data from the server
				const updatedResponse = await fetch("http://localhost:3000/events");
				const updatedData = await updatedResponse.json();
				// Update the data state with the new data
				setData(updatedData);

				// Show a success toast
				toast({
					title: "Event created.",
					description: "Your activity has been succesfully added!",
					status: "success",
					duration: 9000,
					isClosable: true,
				});

				// Close the modal
				setShowModal(false); // Close the modal
                console.log(showModal);

			}
		} catch (error) {
			console.error("Error:", error);
			setSubmitting(false);

			toast({
				title: "Error",
				description: "There was an error creating the event.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
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
			// const updatedData = await fetchEvents();

			// Do something with the updated data
		} catch (error) {
			console.error("There was a problem with the DELETE request:", error);
			toast({
				title: "Error",
				description: "There was an error deleting the event.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	// 		// Call the function with the ID of the object you want to delete
	// deleteEvent(11);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} id="eventForm">
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
						{...register("title", { required: "Title is required" })}
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
