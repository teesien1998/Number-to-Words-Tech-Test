# Number to Words - Full Stack Application

A full-stack application with a React frontend and Node.js backend designed to convert numerical input into its English word representation.

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

1. **Install Backend Dependencies**:

   ```bash
   cd backend
   npm install    # Only needed first time
   ```

2. **Backend Environment Variables (.env)**:

   - `PORT=3000`
   - `NODE_ENV=development`
   - `FRONTEND_URL=http://localhost:5174`

3. **Install the Frontend Dependencies**:

   ```bash
   cd frontend
   npm install    # Only needed first time
   ```

4. **Frontend Environment Variables (.env)**:

   - `VITE_BACKEND_URL=http://localhost:3000`

5. **Install Dependencies at Project Root**:

   ```bash
   cd ..
   npm install    # Only needed first time
   ```

6. **Running the App Locally at Project Root**:

   ```bash
   npm run dev
   ```

   - Backend will run on: http://localhost:3000
   - Frontend will run on: http://localhost:5174

### Testing the Connection

1. Open http://localhost:5174 in your browser.
2. Enter a number in the input field to convert it into words.
3. The backend processes the input and returns the word representation.

## API Endpoints

### POST /api/convert

**Description:** Converts a numerical amount into its English word representation.

**Request Body:**

```json
{
  "amount": "123.45"
}
```

**Response:**

```json
{
  "words": "ONE HUNDRED TWENTY-THREE DOLLARS AND FORTY-FIVE CENTS"
}
```

## Author

### Tee Sien Lau

- **GitHub:** [Number-to-Words-Tech-Test](https://github.com/teesien1998/Number-to-Words-Tech-Test)
- **License:** MIT License

---
