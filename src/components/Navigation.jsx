import { Link } from "react-router-dom";
import { HStack, Box, Flex, Center } from "@chakra-ui/react";

export const Navigation = () => {
	return (
		<Box bg="pink.50" h={{md:"3em", base:"2em"}} boxShadow="2xl">
			<Flex alignItems="center" justifyContent="space-around">
				<Center>
					<nav>
						<Link to="/">Link</Link>
					</nav>
				</Center>
				<Center>
					<nav>
						<Link to="/event/1">Link</Link>
					</nav>
				</Center>
			</Flex>
		</Box>
	);
};
