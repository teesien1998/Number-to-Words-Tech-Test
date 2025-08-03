# Backend API

Node.js Express backend server for the Tech Test application.

## Features

- Express.js web framework
- CORS enabled for frontend communication
- Security headers with Helmet
- Request logging with Morgan
- Environment variable configuration
- Error handling middleware
- Sample REST API endpoints

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create and configure your `.env` file (copy from `.env.example` if needed)

## Running the Server

### Development mode (with auto-restart):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The server will start on http://localhost:3001 by default.

## API Endpoints

### Health Check

- `GET /api/health` - Server health status

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user

### Root

- `GET /` - API information

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)

## Project Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env              # Environment variables
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Development

The server uses ES modules (type: "module" in package.json), so use `import/export` syntax.

To add new routes, modify `server.js` or create separate route files and import them.
