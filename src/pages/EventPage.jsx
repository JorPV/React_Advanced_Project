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
	Spinner,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
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
	const [eventData, setEventData] = useState(event);
	const { categories, users } = useEventContext();
	const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	// Check if users data is available
	if (!users || users.length === 0) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: "10rem",
				}}
			>
				<Spinner size="lg" m="4" />
				<h1 style={{ fontSize: "42px" }}>Loading...</h1>
			</div>
		);
	}
	const createdByUser = users.find((user) => user.id === event.createdBy);

	const handleUpdateEventData = (updatedEventData) => {
		setEventData(updatedEventData);
	};

	const openEditModal = () => {
		setIsEditEventModalOpen(true);
	};

	const openDeleteModal = () => {
		setIsDeleteModalOpen(true);
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
					<Flex
						flexDirection={{ base: "column", md:"row"}}
						justifyContent={{ base: "start", md: "space-between" }}
						alignItems={{ base: "end", lg: "center" }}
					>
						<Box alignSelf="start">
							<Heading
								mb="3"
								color={"teal.500"}
								as="h2"
								size={{ base: "lg", md: "xl", lg: "2xl" }}
							>
								{eventData.title}
							</Heading>
							<Text
								fontSize={{ base: "md", md: "md", lg: "xl" }}
								mb="2"
								as="em"
								color="gray.600"
							>
								{eventData.description}
							</Text>
						</Box>
						<Flex justifyContent="center" alignItems="center" my={{base:5, lg:0}}>
							<div>
								<Text
									fontSize={{ base: "12px", md: "md", lg: "xl" }}
									mr="5"
									as="b"
								>
									Created by:
								</Text>
								<Text fontSize={{ base: "10px", md: "md", lg: "lg" }}>
									{createdByUser.name}
								</Text>
							</div>
							<Avatar
								size={{ base: "sm", md: "lg", lg: "xl" }}
								name={createdByUser.name}
								src={createdByUser.image}
							/>
						</Flex>
					</Flex>
					<Spacer h={9} />
					<Flex
						direction={{ base: "column", lg: "row" }}
						justifyContent={"between"}
					>
						<Image
							borderRadius="3%"
							boxSize={{ base: "100%", lg: "40%" }}
							src={eventData.image}
							alt="Activity image"
							marginRight={8}
							mb={{ base: "5", lg: "0" }}
						/>
						<Flex direction="column" w="full">
							<div>
								<Text as="b" fontSize={{ base: "md", md: "md", lg: "xl" }}>
									Location:
								</Text>
								<Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
									{eventData.location}
								</Text>
							</div>
							<div>
								<Text mt="7">
									<Text as="b" fontSize={{ base: "md", md: "md", lg: "xl" }}>
										Starts:{" "}
									</Text>
									<Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
										{new Date(eventData.startTime).toLocaleString(
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
										{new Date(eventData.endTime).toLocaleString(
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
								{(eventData.categoryIds || []).map((categoryId, index) => {
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
				<Button
					colorScheme="pink"
					size={{ base: "md", md: "md", lg: "lg" }}
					leftIcon={<EditIcon />}
					onClick={openEditModal}
				>
					<Text fontSize={{ base: "md", md: "md", lg: "lg" }}>
						Edit activity
					</Text>
				</Button>
				<Button
					colorScheme="red"
					size={{ base: "md", md: "md", lg: "lg" }}
					leftIcon={<DeleteIcon />}
					onClick={openDeleteModal}
				>
					<Text fontSize={{ base: "md", md: "md", lg: "lg" }}>
						Delete activity
					</Text>
				</Button>
			</Flex>
			<EditEventModal
				isOpen={isEditEventModalOpen}
				onClose={() => setIsEditEventModalOpen(false)}
				initialEventData={eventData}
				onUpdateEventData={handleUpdateEventData}
			/>
			<ConfirmDeleteModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				eventId={event.id}
			/>
		</Container>
	);
};
