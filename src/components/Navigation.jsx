import { Link } from "react-router-dom";
import { Box, Flex, Center, Text } from "@chakra-ui/react";

export const Navigation = () => {
	return (
		<Box bg="white" h={{ md: "4em", base: "3em" }} boxShadow="2xl" position={"sticky"} top={0} zIndex={1}>
			<Flex ml="11em" h="full" justifyContent="start" gap="9">
				<Center>
					<Text color="blue.600">
						<nav>
							<Link to="/">All activities</Link>
						</nav>
					</Text>
				</Center>
				<Center>
					<Text color="blue.600">
						<nav>
							<Link to="/event/1">EventPagina</Link>
						</nav>
					</Text>
				</Center>
			</Flex>
		</Box>
	);
};
