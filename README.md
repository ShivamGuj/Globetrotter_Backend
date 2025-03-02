# Globetrotter Backend

This is the backend server for the Globetrotter application, a geography quiz game.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

   The server will run on http://localhost:5000

## API Endpoints

### Destinations
- `GET /api/destinations/random` - Get a random destination with multiple-choice options

### Users
- `POST /api/users` - Create a new user
- `GET /api/users/username/:username` - Get a user by username
- `PUT /api/users/:id` - Update a user's information

## Data Structure

The application uses two main data files:

1. `destinations.json` - Contains information about destinations, clues, and fun facts
2. `users.json` - Stores user profiles and scores (created automatically)

## Database Migrations

If you encounter database schema issues like missing columns, you can fix them by running:

```bash
# Run the schema fix script
npm run fix-schema
```

This will add any missing columns to your database tables.
