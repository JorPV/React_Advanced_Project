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
import ErrorBoundary from "./components/ErrorBoundary";

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
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ErrorBoundary>
			<ChakraProvider>
				<EventsProvider>
					<RouterProvider router={router} />
				</EventsProvider>
			</ChakraProvider>
		</ErrorBoundary>
	</React.StrictMode>
);
