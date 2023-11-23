import { Link } from "react-router-dom";
import { Box, Flex, Center, Text, Spacer } from "@chakra-ui/react";

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
			<Flex h="full" justifyContent="start">
				<Spacer maxW={16} />
				<Center>
					<nav>
						<Text
							color="blue.600"
							as="b"
							fontSize={{ base: "md", md: "lg", lg: "2xl" }}
						>
							<Link to="/">List of activities</Link>
						</Text>
					</nav>
				</Center>
			</Flex>
		</Box>
	);
};
