import { Input } from "@chakra-ui/react";

export const SearchInput = ({ value, onChange }) => {
	return (
		<>
			<Input
				variant="outline"
				type="text"
				placeholder="Search activities by title"
                bg={"white"}
				value={value}
				onChange={onChange}
			/>
		</>
	);
};
