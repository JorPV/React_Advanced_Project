import { Link } from "react-router-dom";
import { Box, Flex, Center, Text } from "@chakra-ui/react";

export const Navigation = () => {
	return (
		<Box
			bg="white"
			h={{ md: "4em", base: "3em" }}
			boxShadow="2xl"
			position={"sticky"}
			top={0}
			zIndex={1}
		>
			<Flex ml="11em" h="full" justifyContent="start" gap="9">
				<Center>
					<nav>
						<Text color="blue.600">
							<Link to="/">All activities</Link>
						</Text>
					</nav>
				</Center>
				<Center>
					<nav>
						<Text color="blue.600">
							<Link to="/event/1">EventPagina</Link>
						</Text>
					</nav>
				</Center>
			</Flex>
		</Box>
	);
};
