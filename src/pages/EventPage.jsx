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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button as DeleteButton } from "@chakra-ui/react";
import { Button as EditButton } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useEventContext } from "../context/EventsDataContext";
import { useState } from "react";
import { EditEventModal } from "../components/ui/EditEventModal";
import { ConfirmDeleteModal } from "../components/ui/ConfirmationModal";

export const loader = async ({ params }) => {
	const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
	return {
		event: await event.json(),
	};
};

export const EventPage = () => {
	const { event } = useLoaderData();
	const { categories, users } = useEventContext();
	const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

	const handleEditClick = () => {
		setIsEditEventModalOpen(true);
	};

	const handleDeleteClick = () => {
		setIsConfirmationModalOpen(true);
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
			<Center
				boxShadow="lg"
				rounded="md"
				w="full"
				bg="gray.50"
				mt={{ base: "10", lg: "20" }}
			>
				<Box m="8">
					<Flex justifyContent={"space-between"}>
						<div>
							<Heading
								mb="3"
								color={"teal.500"}
								as="h2"
								size={{ base: "lg", md: "xl", lg: "2xl" }}
							>
								{event.title}
							</Heading>
							<Text
								fontSize={{ base: "md", md: "md", lg: "xl" }}
								mb="2"
								as="em"
								color="gray.600"
							>
								{event.description}
							</Text>
						</div>
						<Flex justifyContent="center" alignItems="center">
							<div>
								<Text
									fontSize={{ base: "sm", md: "md", lg: "xl" }}
									mr="5"
									as="b"
								>
									Created by:
								</Text>
								<Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
									{createdByUser.name}
								</Text>
							</div>
							<Avatar
								size={{ base: "lg", md: "xl", lg: "xl" }}
								name={createdByUser.name}
								src={createdByUser.image}
							/>
						</Flex>
					</Flex>
					<Spacer h={9} />
					<Flex
						direction={{ base: "column", md: "column", lg: "row" }}
						justifyContent={"between"}
					>
						<Image
							borderRadius="3%"
							boxSize={{ base: "100%", md: "50%", lg: "40%" }}
							src={event.image}
							alt="Event image"
							marginRight={8}
							mb={{ base: "5", lg: "0" }}
						/>
						<Flex direction="column" w="full">
							<div>
								<Text as="b" fontSize={{ base: "md", md: "md", lg: "xl" }}>
									Location:
								</Text>
								<Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
									{event.location}
								</Text>
							</div>
							<div>
								<Text mt="7">
									<Text as="b" fontSize={{ base: "md", md: "md", lg: "xl" }}>
										Starts:{" "}
									</Text>
									<Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
										{new Date(event.startTime).toLocaleString(
											"en-US",
											timeOptions
										)}
									</Text>
								</Text>
								<Text mt="2">
									<Text as="b" fontSize={{ base: "md", md: "md", lg: "xl" }}>
										Finishes:{" "}
									</Text>
									<Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
										{new Date(event.endTime).toLocaleString(
											"en-US",
											timeOptions
										)}
									</Text>
								</Text>
							</div>
						</Flex>
						<Flex justifyContent="end" alignContent="center" w="full">
							<Text
								mt="2em"
								as="b"
								alignSelf="end"
								fontSize={{ base: "md", md: "md", lg: "lg" }}
							>
								Categories:
								{(event.categoryIds || []).map((categoryId, index) => {
									const category = categories.find((c) => c.id === categoryId);
									return (
										<Tag
											key={index}
											variant="outline"
											size={{ base: "sm", md: "md", lg: "lg" }}
											colorScheme="purple"
											ml="0.5em"
										>
											{category ? category.name : ""}
										</Tag>
									);
								})}
							</Text>
						</Flex>
					</Flex>
				</Box>
			</Center>

			<Flex my="8" justifyContent="right" gap="4">
				<EditButton
					colorScheme="pink"
					size={{ base: "md", md: "md", lg: "lg" }}
					leftIcon={<EditIcon />}
					onClick={handleEditClick}
				>
					<Text fontSize={{ base: "md", md: "md", lg: "lg" }}>
						Edit activity
					</Text>
				</EditButton>
				<DeleteButton
					colorScheme="red"
					size={{ base: "md", md: "md", lg: "lg" }}
					leftIcon={<DeleteIcon />}
					onClick={handleDeleteClick}
				>
					<Text fontSize={{ base: "md", md: "md", lg: "lg" }}>
						Delete activity
					</Text>
				</DeleteButton>
			</Flex>
			<EditEventModal
				isOpen={isEditEventModalOpen}
				onClose={() => setIsEditEventModalOpen(false)}
			/>
			<ConfirmDeleteModal
				isOpen={isConfirmationModalOpen}
				onClose={() => setIsConfirmationModalOpen(false)}
				eventId={event.id}
			/>
		</Container>
	);
};
