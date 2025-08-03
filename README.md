# Tech Test - Full Stack Application

A full-stack application with React frontend and Node.js backend.

## Project Structure

```
Tech Test/
├── frontend/          # React + Vite frontend
│   ├── src/
│   ├── package.json
│   └── ...
└── backend/           # Node.js + Express backend
    ├── server.js
    ├── package.json
    └── ...
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm

### Running the Application

1. **Start the Backend** (in one terminal):

   ```bash
   cd backend
   npm install    # Only needed first time
   npm run dev    # Development mode with auto-restart
   ```

   Backend will run on: http://localhost:3001

2. **Start the Frontend** (in another terminal):
   ```bash
   cd frontend
   npm install    # Only needed first time
   npm run dev    # Development mode
   ```
   Frontend will run on: http://localhost:5173

### Testing the Connection

1. Open http://localhost:5173 in your browser
2. You should see:
   - ✅ Connected to backend (if backend is running)
   - A list of sample users fetched from the API
   - A working counter demo

## Development

### Backend Features

- Express.js server
- CORS enabled for frontend communication
- Sample REST API endpoints (`/api/users`)
- Health check endpoint (`/api/health`)
- Error handling and logging
- Environment variable configuration

### Frontend Features

- React with Vite
- API integration with backend
- Real-time backend status checking
- Sample user data display

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user

## Production Deployment

### Backend

```bash
cd backend
npm install --production
npm start
```

### Frontend

```bash
cd frontend
npm run build
# Serve the dist/ folder with your preferred web server
```

## Environment Variables

### Backend (.env)

- `PORT=3001`
- `NODE_ENV=development`
- `FRONTEND_URL=http://localhost:5173`

## Troubleshooting

1. **CORS errors**: Make sure backend is running and FRONTEND_URL is correctly set
2. **Cannot connect to backend**: Verify backend is running on port 3001
3. **Port conflicts**: Change ports in package.json scripts if needed

## Next Steps

- Add a database (MongoDB, PostgreSQL, etc.)
- Implement authentication (JWT)
- Add more API endpoints
- Add proper error handling in frontend
- Add tests for both frontend and backend
- Set up Docker containers
- Add CI/CD pipeline
