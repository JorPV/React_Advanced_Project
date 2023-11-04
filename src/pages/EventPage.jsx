import {
	Container,
	Center,
	Box,
	Flex,
	Heading,
	Text,
	Image,
	Spacer,
	Avatar,
	Tag,
	useToast,
} from "@chakra-ui/react";
import { Button as DeleteButton } from "@chakra-ui/react";
import { Button as EditButton } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useEventContext } from "../context/EventsDataContext";
import { deleteEvent } from "../services/deleteData";
import { useState } from "react";
import { NewEventModal } from "../components/ui/NewEventModal";

export const loader = async ({ params }) => {
	const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
	return {
		event: await event.json(),
	};
};

export const EventPage = () => {
	const { event } = useLoaderData();
	const { categories, users } = useEventContext();
	const toast = useToast();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEditClick = () => {
		setIsModalOpen(true);
	};

	const handleDelete = async () => {
		try {
			await deleteEvent(event.id);
			toast({
				title: "Event deleted",
				description: "Your activity has been succesfully deleted!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			console.log("Object deleted successfully");
		} catch (error) {
			console.error("Error deleting event:", error);
			toast({
				title: "Error",
				description: "There was an error deleting the activity.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	const timeOptions = {
		weekday: "long",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};

	const createdByUser = users.find((user) => user.id === event.createdBy);

	if (!createdByUser) {
		return <div>Matching user not found</div>; // Handle the case where no matching user is found
	}

	return (
		<Container maxW="75%">
			<Spacer m={8} />
			<Center boxShadow="md" rounded="md" w="full">
				<Box m="8">
					<Flex justifyContent={"space-between"}>
						<div>
							<Heading mb="3" color={"teal.500"}>
								{event.title}
							</Heading>
							<Text fontSize="xl" mb="2">
								{event.description}
							</Text>
						</div>
						<Flex justifyContent="center" alignItems="center">
							<div>
								<Text fontSize="xl" mr="5">
									Created by:
								</Text>
								<Text>{createdByUser.name}</Text>
							</div>
							<Avatar
								size="xl"
								name={createdByUser.name}
								src={createdByUser.image}
							/>
						</Flex>
					</Flex>
					<Spacer h={9} />
					<Image
						borderRadius="3%"
						boxSize="auto"
						src={event.image}
						alt="Event image"
					/>
					<Spacer mt="7" />
					<Text as="b">Location: </Text>
					{event.location}
					<Flex direction="row" justifyContent="space-between">
						<div>
							<Text mt="7">
								<Text as="b">Starts: </Text>
								<span>
									{new Date(event.startTime).toLocaleString(
										"en-US",
										timeOptions
									)}
								</span>
							</Text>
							<Text mt="2">
								<Text as="b">Finishes: </Text>
								<span>
									{new Date(event.endTime).toLocaleString("en-US", timeOptions)}
								</span>
							</Text>
						</div>
						<Text mt="2em" as="b" alignSelf="end">
							Categories:
							{(event.categoryIds || []).map((categoryId, index) => {
								const category = categories.find((c) => c.id === categoryId);
								return (
									<Tag
										key={index}
										variant="outline"
										colorScheme="purple"
										ml="0.5em"
									>
										{category ? category.name : ""}
									</Tag>
								);
							})}
						</Text>
					</Flex>
				</Box>
			</Center>
			<Flex my="8" justifyContent="right" gap="4">
				<EditButton size="lg" bg="#cc6bb7" onClick={handleEditClick}>
					Edit event
				</EditButton>
				<DeleteButton size="lg" bg="red" color="white" onClick={handleDelete}>
					Delete event
				</DeleteButton>
			</Flex>
			<NewEventModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</Container>
	);
};
