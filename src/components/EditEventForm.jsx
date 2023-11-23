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
import { useParams } from "react-router-dom";
import { useEditEvent } from "../utils/editData";

export const EditEventForm = ({ setIsOpen, onUpdateEventData }) => {
	const { eventId } = useParams();
	const { updateEvent } = useEditEvent();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const editData = async (data) => {
		// Create an array of categories
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

		try {
			//PATCH request body
			const patchData = {
				...(data.title && { title: data.title }),
				...(data.description && { description: data.description }),
				...(data.image && { image: data.image }),
				...(data.location && { location: data.location }),
				...(data.startTime && { startTime: data.startTime }),
				...(data.endTime && { endTime: data.endTime }),
				...(selectedCategories.length > 0 && {
					categoryIds: selectedCategories,
				}),
			};
			const updatedEventData = await updateEvent(eventId, patchData);
			onUpdateEventData(updatedEventData);
			setIsOpen(false);
		} catch (error) {
			console.error("Error:", error);
			return (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: "10rem",
					}}
				>
					<h1 style={{ fontSize: "42px" }}>
						Unfortunately... an error ocurred when editing the activity.
					</h1>
				</div>
			);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(editData)} id="updateForm">
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
