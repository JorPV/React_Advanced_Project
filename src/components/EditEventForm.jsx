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
import { useEditEvent } from "../services/editData";
import { useParams } from "react-router-dom";

export const EditEventForm = ({ handleUpdate, setIsOpen, setEvents }) => {
	const { eventId } = useParams();

	const { submitting, updateData } = useEditEvent();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const editData = async (data) => {
		try {
			// Construct the PATCH request body
			const patchData = {
				title: data.title,
				description: data.description,
				image: data.image,
				location: data.location,
				startTime: data.startTime,
				endTime: data.endTime,
			};

			// Use the updateData hook from useEditEvent
			await handleUpdate(eventId, patchData);

			setIsOpen(false);
		} catch (error) {
			console.error("Error:", error);
			// Handle error scenarios if needed
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(editData)} id="updateForm">
				{/* To do: add the isRequired attribute to each form control */}
				<FormControl>
					<FormLabel>Name</FormLabel>
					<Input {...register("name")} placeholder="Change name" name="name" />
					<Text color="tomato">{errors?.name && errors.name.message}</Text>
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>Activity title</FormLabel>
					<Input
						{...register("title")}
						placeholder="Change the name of the activity"
						name="title"
					/>
					<Text color="tomato">{errors?.name && errors.name.message}</Text>
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>Description</FormLabel>
					<Input
						{...register("description")}
						placeholder="Change the activity description"
						name="description"
					/>
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>Location</FormLabel>
					<Input
						{...register("location")}
						placeholder="Update the activity location"
						name="location"
					/>
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>New start time</FormLabel>
					<Input
						placeholder="Select Date and Time"
						type="datetime-local"
						name="startTime"
						{...register("startTime")}
					/>
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>New end time</FormLabel>
					<Input
						name="endTime"
						{...register("endTime")}
						placeholder="Select Date and Time"
						type="datetime-local"
					/>
				</FormControl>

				<FormControl mt={4} mb={4}>
					<FormLabel>Update categories</FormLabel>
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
					<FormLabel>Update activity picture:</FormLabel>
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
