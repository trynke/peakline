# Peakline

Explore mountain routes through maps, elevation data, and spatial analysis.

Mountain Route Explorer is a web application that helps visualize and analyze GPX tracks.  
The project focuses on understanding terrain, elevation structure, and route characteristics through an interactive map interface.


## Features

Current version includes:

- GPX route upload
- interactive map visualization
- route statistics (distance, elevation gain/loss)
- elevation profile chart
- backend route analysis

The goal is to gradually evolve the project into a spatial exploration tool for mountain routes.


## Why this project exists

I enjoy exploring maps and mountain terrain.  
Looking at maps, analyzing routes, and understanding the structure of a landscape is fascinating.

This project is both:

- a spatial exploration tool
- a playground for building map-based systems
- a portfolio project focused on system design and backend architecture


## Demo concept

User workflow:

1. upload GPX track
2. backend analyzes route
3. route is displayed on map
4. elevation profile is generated
5. route statistics are calculated


## Tech stack

Backend

- .NET / ASP.NET Core
- REST API
- XML parsing for GPX files

Frontend

- React
- TypeScript
- Vite
- MapLibre (map rendering)
- Recharts (elevation charts)


## Architecture

The project follows a simple architecture:

Frontend (React)
↓
Backend API (ASP.NET Core)

Backend responsibilities:

- GPX parsing
- route analysis
- elevation calculations
- domain logic

Frontend responsibilities:

- map rendering
- user interaction
- data visualization


## Repository structure

```text
backend/
src/
Api
Application
Domain
Infrastructure

frontend/
React application
map components
route visualization
```

The backend follows a domain-focused structure separating domain models, application logic, and infrastructure.


## Roadmap

Version 1 (current focus)

- GPX upload
- route map visualization
- elevation profile
- route statistics

Version 2

- saved routes
- spatial database
- map layers
- interesting places

Version 3

- exploration mode
- route comparison
- AI-assisted route insights


## Running locally

Backend

```bash
cd backend/src/Peakline.Api
dotnet run
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

## Project goals

This project is intentionally built as:

- a spatial systems learning platform
- a portfolio project demonstrating system design
- an experiment in map-based product ideas


## License

MIT License
