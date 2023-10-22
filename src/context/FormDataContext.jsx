import { createContext, useState } from "react";

export const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
	const [formData, setFormData] = useState({}); // Initialize with an empty object or the initial form data

	return (
		<FormDataContext.Provider value={{ formData, setFormData }}>
			{children}
		</FormDataContext.Provider>
	);
};
