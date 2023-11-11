import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const SearchInput = ({ value, onChange }) => {
	return (
		<>
			<InputGroup>
				<InputLeftElement>
					<SearchIcon />
				</InputLeftElement>
				<Input
					variant="outline"
					type="text"
					placeholder="Search activities by title"
					bg={"white"}
					value={value}
					onChange={onChange}
				/>
			</InputGroup>
		</>
	);
};
