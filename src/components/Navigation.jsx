import { Link } from "react-router-dom";
import { Box, Flex, Center, Text } from "@chakra-ui/react";

export const Navigation = () => {
	return (
		<Box
			bg="white"
			h={{ base: "3em", md: "4em", lg: "6em" }}
			boxShadow="2xl"
			position={"sticky"}
			top={0}
			zIndex={1}
		>
			<Flex ml="11em" h="full" justifyContent="start" gap="9">
				<Center>
					<nav>
						<Text
							color="blue.600"
							as="b"
							fontSize={{ base: "md", md: "md", lg: "xl" }}
						>
							<Link to="/">List of ctivities</Link>
						</Text>
					</nav>
				</Center>
				{/* <Center>
					<nav>
						<Text
							color="blue.600"
							as="b"
							fontSize={{ base: "md", md: "md", lg: "xl" }}
						>
							<Link to="/event/1">Activity page</Link>
						</Text>
					</nav>
				</Center> */}
			</Flex>
		</Box>
	);
};
