import {
	Heading,
	Card,
	Image,
	Stack,
	Flex,
	CardBody,
	Text,
	Tag,
	Box,
	Spacer,
	CardFooter,
} from "@chakra-ui/react";
import { useEventContext } from "../../context/EventsDataContext";

export const EventsCard = ({ event, onClick }) => {
	const { categories } = useEventContext();

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
			minH="full"
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

			<Stack>
				<CardBody>
					<Heading size="xl" color="teal.500" mb="2">
						{event.title}
					</Heading>

					<Text as="em" fontSize="lg" color="gray.600">
						{event.description}
					</Text>
					<Flex
						h="full"
						direction="column"
						justifyContent="space-evenly"
						mt={{ base: "4", md: "0" }}
					>
						<Box>
							<Text
								fontWeight="semibold"
								as="u"
								fontSize={{ base: "md", md: "lg", lg: "18px" }}
							>
								Location:
							</Text>
							<Text
								fontSize={{ base: "md", md: "lg", lg: "17px" }}
								fontWeight="thin"
							>
								{event.location}
							</Text>
						</Box>
						<Box>
							<Text
								fontWeight="semibold"
								fontSize={{ base: "md", md: "lg", lg: "18px" }}
							>
								Starts:
								<Text fontWeight="thin" ml={1} display="inline" fontSize="17px">
									{new Date(event.startTime).toLocaleString(
										"en-US",
										timeOptions
									)}
								</Text>
							</Text>
							<Text
								fontWeight="semibold"
								fontSize={{ base: "md", md: "lg", lg: "18px" }}
							>
								Ends:
								<Text fontWeight="thin" ml={1} display="inline">
									{new Date(event.endTime).toLocaleString("en-US", timeOptions)}
								</Text>
							</Text>
						</Box>
					</Flex>
				</CardBody>

				<CardFooter flexDirection="column">
					<Spacer m="8"/>
					<Text
						fontWeight="semibold"
						fontSize={{ base: "sm", md: "md", lg: "18px" }}
						as="u"
					>
						Categories:
						{(event.categoryIds || []).map((categoryId, index) => {
							const category = categories.find((c) => c.id === categoryId);
							return (
								<Tag
									key={index}
									size={{ base: "sm", md: "md", lg: "md" }}
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
