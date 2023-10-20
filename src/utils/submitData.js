export const submitData = async (
	data,
	lastId,
	setSubmitting,
	setValue,
	setLastAddedId,
	setIsOpen,
	setEvents,
	toast,
	fetchData
) => {
	setSubmitting(true);
	let userId;
	if (data.name) {
		const usersResponse = await fetch("http://localhost:3000/users");
		const usersData = await usersResponse.json();

		// Find if the user already exists
		const existingUser = usersData.find((user) => user.name === data.name);
		if (existingUser) {
			userId = existingUser.id;
		} else {
			const userResponse = await fetch("http://localhost:3000/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: data.name,
					image: data.image,
				}),
			});
			const userData = await userResponse.json();
			userId = userData.id;
		}
	}
	lastId++;

	// Create an array of categories and add the selected options.
	const selectedCategories = [];
	if (data.sports) {
		selectedCategories.push(parseInt("1"));
	}
	if (data.games) {
		selectedCategories.push(parseInt("2"));
	}
	if (data.relaxation) {
		selectedCategories.push(parseInt("3"));
	}

	const formattedData = {
		id: lastId,
		createdBy: userId,
		title: data.title,
		description: data.description,
		image: data.image, // Assuming 'img' is a URL
		categoryIds: selectedCategories,
		location: data.location,
		startTime: data.startTime,
		endTime: data.endTime,
	};

	try {
		const response = await fetch("http://localhost:3000/events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formattedData),
		});
		const responseData = await response.json();
		console.log("Success:", responseData);
		setValue("categoryIds", []); // Reset selectedCategories to an empty array
		setSubmitting(false);
		setLastAddedId(lastId);

		if (response.ok) {
			// Fetch the updated data from the server
			const updatedResponse = await fetch("http://localhost:3000/events");
			const updatedData = await updatedResponse.json();
			fetchData();

			// Trigger a re-render by updating the dummy state
			setEvents(updatedData);

			// Show a success toast
			toast({
				title: "Event created.",
				description: "Your activity has been succesfully added!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});

			// Close the modal
			setIsOpen(false);
		}
	} catch (error) {
		console.error("Error:", error);
		setSubmitting(false);

		toast({
			title: "Error",
			description: "There was an error creating the event.",
			status: "error",
			duration: 9000,
			isClosable: true,
		});
	}
};