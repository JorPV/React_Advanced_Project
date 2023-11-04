import React, { useState, useEffect } from "react";
import {
	Heading,
	Card,
	Image,
	Stack,
	Flex,
	CardBody,
	Text,
	Tag,
	CardFooter,
} from "@chakra-ui/react";

export const EventsCard = ({ event, categories, onClick }) => {
	// State to hold the event data
	const [currentEvent, setCurrentEvent] = useState(event);

	// Use useEffect to update the event data when it changes
	useEffect(() => {
		setCurrentEvent(event);
	}, [event]);

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
		<Card
			key={event.id}
			direction={{ base: "column", sm: "row" }}
			overflow="hidden"
			variant="outline"
			my={5}
			minH={"350px"}
			cursor="pointer"
			_hover={{
				transform: "scale(1.03)",
				transition: "transform 0.2s ease-in",
			}}
			onClick={onClick}
		>
			<Image
				objectFit="cover"
				maxW={{ base: "100%", lg: "35%", md: "35%", sm: "200px" }}
				src={event.image}
				alt="Activity image"
			/>

			<Stack pl={7}>
				<CardBody>
					<Heading size="xl" color={"teal.500"}>
						{event.title}
					</Heading>

					<Text fontSize="lg" color="gray.600" py="2">
						{event.description}
					</Text>
					<Flex h="full" direction="column" justifyContent="space-evenly">
						<div>
							<Text fontWeight="semibold">Location: </Text>
							{event.location}
						</div>
						<div>
							<Text fontWeight="semibold">
								Starts:
								<Text fontWeight="normal" ml={1} display="inline">
									{new Date(event.startTime).toLocaleString(
										"en-US",
										timeOptions
									)}
								</Text>
							</Text>
							<Text fontWeight="semibold">
								Ends:
								<Text fontWeight="normal" ml={1} display="inline">
									{new Date(event.endTime).toLocaleString("en-US", timeOptions)}
								</Text>
							</Text>
						</div>
					</Flex>
				</CardBody>

				<CardFooter>
					<Text fontWeight="semibold" mt="2em">
						Categories:
						{(event.categoryIds || []).map((categoryId, index) => {
							const category = categories.find((c) => c.id === categoryId);
							return (
								<Tag 
									key={index}
                                    size="md"
									variant="outline"
									colorScheme="purple"
									ml="0.5em"
								>
									{category ? category.name : ""}
								</Tag>
							);
						})}
					</Text>
				</CardFooter>
			</Stack>
		</Card>
	);
};
