# React Advanced Project

An events management dashboard built with React, featuring full CRUD operations, search, filtering, and error handling.

## Features

- Browse and view event details
- Create new events with form validation
- Edit existing events via modal dialogs
- Delete events with confirmation prompts
- Search events by keyword
- Filter events by category
- Error boundary for graceful error handling
- Context-based state management

## Tech Stack

![React](https://img.shields.io/badge/-React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Chakra UI](https://img.shields.io/badge/-Chakra_UI-319795?style=flat-square&logo=chakraui&logoColor=white)
![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

- **React 18** with React Router for page navigation
- **Chakra UI** for component styling
- **React Hook Form** for form handling and validation
- **Framer Motion** for animations
- **Vite** for fast development and bundling

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── EditEventForm.jsx
│   ├── ErrorBoundary.jsx
│   ├── Navigation.jsx
│   ├── NewEventForm.jsx
│   ├── Root.jsx
│   └── ui/              # Reusable UI components
├── context/
│   └── EventsDataContext.jsx
├── pages/
│   ├── EventPage.jsx
│   └── EventsPage.jsx
└── utils/               # API helpers (CRUD operations)
```
