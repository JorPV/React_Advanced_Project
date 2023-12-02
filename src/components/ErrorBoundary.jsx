import { Component } from "react";
import { Center, Heading, Text } from "@chakra-ui/react";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	render() {
		if (this.state.hasError) {
			return (
				<Center mt="20em">
					<Heading color="red" size={{ base: "sm", md: "md", lg: "lg" }}>
						Something went wrong. Please try again later.
					</Heading>
					<Text>{this.state.error.message}</Text>
				</Center>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
