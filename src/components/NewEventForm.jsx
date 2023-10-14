import {
	FormControl,
	FormLabel,
	Input,
	CheckboxGroup,
	Stack,
	Checkbox,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export const NewEventForm = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} id="eventForm">
				{/* To do: add the isRequired attribute to each form control */}
				<FormControl>
					<FormLabel>Name</FormLabel>
					<Input {...register("name")} placeholder="Your name" />
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>Activity title</FormLabel>
					<Input
						{...register("title")}
						placeholder="The name of the activity"
					/>
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>Description</FormLabel>
					<Input {...register("description")} placeholder="Brief description" />
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>Location</FormLabel>
					<Input
						{...register("location")}
						placeholder="Where will the activity take place"
					/>
				</FormControl>

				<FormControl mt={4}>
					<FormLabel>Start time</FormLabel>
					<Input
						{...register("startTime")}
						placeholder="Select Date and Time"
						type="datetime-local"
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
					<CheckboxGroup
						{...register("categoryIds")}
						defaultValue={[]}
						colorScheme="green"
					>
						<p>{errors.categoryIds?.message}</p>
						<Stack spacing={[1, 5]} direction={["column", "row"]}>
							<Checkbox
								{...register("categoryIds")}
								value="1"
								name="sports"
								onChange={(e) => console.log(e.target.value)}
							>
								Sports
							</Checkbox>
							<Checkbox
								{...register("categoryIds")}
								value="2"
								name="games"
								onChange={(e) => console.log(e.target.name)}
							>
								Games
							</Checkbox>
							<Checkbox
								{...register("categoryIds")}
								value="3"
								name="relaxation"
							>
								Relaxation
							</Checkbox>
						</Stack>
					</CheckboxGroup>
				</FormControl>

				<div>
					<FormLabel>Add a picture:</FormLabel>
					<input
						type="file"
						{...register("img")}
						accept="image/png, image/jpeg"
					/>
				</div>
			</form>
		</>
	);
};
