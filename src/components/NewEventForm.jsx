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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const NewEventForm = () => {
	const [submitting, setSubmitting] = useState(false);
	const [lastAddedId, setLastAddedId] = useState(null);

	const {
		register,
        watch,
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

    const selectedCategories = [];
		if (data.sports) {
			selectedCategories.push("1");
		}
		if (data.games) {
			selectedCategories.push("2");
		}
		if (data.relaxation) {
			selectedCategories.push("3");
		}
       
        lastId++;

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
			// setValue("categoryIds", []); // Reset selectedCategories to an empty array
			setSubmitting(false);
			setLastAddedId(lastId);
		} catch (error) {
			console.error("Error:", error);
			setSubmitting(false);
		}
	};

	const deleteActivity = async (id) => {
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

			// You may want to fetch the updated data after the delete request
			// const updatedData = await fetchEvents();

			// Do something with the updated data
		} catch (error) {
			console.error("There was a problem with the DELETE request:", error);
		}
	};

	// 		// Call the function with the ID of the object you want to delete
			// deleteActivity(5);

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
						{...register("startTime")}
						placeholder="Select Date and Time"
						type="datetime-local"
						name="startTime"
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
					<CheckboxGroup defaultValue={[]} colorScheme="green">
						<p>{errors.categoryIds?.message}</p>
						<Stack spacing={[1, 5]} direction={["column", "row"]}>
							<Checkbox
								{...register("categoryIds")}
								value="1"
								name="sports"
								onChange={(e) => {
									const selectedCategories = watch("categoryIds") || [];
									if (e.target.checked) {
										selectedCategories.push(e.target.value);
									} else {
										const index = selectedCategories.indexOf(
											parseInt(e.target.value)
										);
										if (index > -1) {
											selectedCategories.splice(index, 1);
										}
									}
									console.log(selectedCategories);
									setValue("categoryIds", selectedCategories);
								}}
							>
								Sports
							</Checkbox>
							<Checkbox
								{...register("categoryIds")}
								value="2"
								name="games"
								onChange={(e) => {
									const selectedCategories = watch("categoryIds") || [];
									if (e.target.checked) {
										selectedCategories.push(e.target.value);
									} else {
										const index = selectedCategories.indexOf(
											parseInt(e.target.value)
										);
										if (index > -1) {
											selectedCategories.splice(index, 1);
										}
									}
									console.log(selectedCategories);
									setValue("categoryIds", selectedCategories);
								}}
							>
								Games
							</Checkbox>
							<Checkbox
								{...register("categoryIds")}
								value="3"
								name="relaxation"
								onChange={(e) => {
									const selectedCategories = watch("categoryIds") || [];
									if (e.target.checked) {
										selectedCategories.push(e.target.value);
									} else {
										const index = selectedCategories.indexOf(
											parseInt(e.target.value)
										);
										if (index > -1) {
											selectedCategories.splice(index, 1);
										}
									}
									console.log(selectedCategories);
									setValue("categoryIds", selectedCategories);
								}}
							>
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
