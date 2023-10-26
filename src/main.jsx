import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { loader as eventsListLoader } from "./pages/EventsPage";
import { loader as eventLoader } from "./pages/EventPage";
import { EventsProvider } from "./context/EventsDataContext";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <EventsPage />,
				loader: eventsListLoader,
			},
			{
				path: "/event/:eventId",
				element: <EventPage />,
				loader: eventLoader,
				// action: addComment,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<EventsProvider>
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	</EventsProvider>
	// </React.StrictMode>
);
