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
	// useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useCreateEvent } from "../utils/SubmitData";

export const NewEventForm = ({ setShowModal }) => {
	const { createEvent } = useCreateEvent(); // Using the createEvent function from the useCreateEvent hook

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submitData = async (data) => {
		// Initialize the variable
		let lastId;

		// Check if the user exists or create a new user
		let userId;
		if (data.name) {
			const usersResponse = await fetch("http://localhost:3000/users");
			const usersData = await usersResponse.json();

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
						image: "https://www.gstatic.com/webp/gallery3/2.png",
					}),
				});
				const userData = await userResponse.json();
				userId = userData.id;
			}
		}

		// Create an array of categories and set a default image URL
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

		// Use a default image for if no url image is added
		if (!data.image) {
			const defaultImageUrls = [
				"https://www.gstatic.com/webp/gallery/1.jpg",
				"https://www.gstatic.com/webp/gallery/2.jpg",
				"https://www.gstatic.com/webp/gallery/4.jpg",
				"https://www.gstatic.com/webp/gallery/5.jpg",
			];

			const randomIndex = Math.floor(Math.random() * defaultImageUrls.length);
			const defaultImageUrl = defaultImageUrls[randomIndex];
			data.image = defaultImageUrl;
		}

		// Event object data
		const eventData = {
			id: lastId,
			createdBy: userId,
			title: data.title,
			description: data.description,
			image: data.image,
			categoryIds: selectedCategories,
			location: data.location,
			startTime: data.startTime,
			endTime: data.endTime,
		};

		// Call the createEvent function from the useCreateEvent hook
		await createEvent(eventData, setShowModal, setValue);
	};

	const deleteEvent = async (id) => {
		const url = `http://localhost:3000/events/${id}`;
		// const url = `http://localhost:3000/users/${id}`;

		try {
			const response = await fetch(url, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			console.log("Object deleted successfully");

			// Do something with the updated data
		} catch (error) {
			console.error("There was a problem with the DELETE request:", error);
		}
	};

	// Call the function with the ID of the object you want to delete
	// deleteEvent(5);

	return (
		<>
			<form onSubmit={handleSubmit(submitData)} id="eventForm">
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
					<InputGroup size="sm">
						<InputLeftAddon children="https://" />
						<Input
							{...register("image")}
							placeholder="Image url"
							accept="image/jpg"
						/>
						<Text color="tomato">{errors?.name && errors.name.message}</Text>
					</InputGroup>
				</FormControl>
			</form>
		</>
	);
};
