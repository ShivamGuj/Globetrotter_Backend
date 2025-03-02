const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File paths
const DESTINATIONS_FILE = path.join(__dirname, 'data', 'destinations.json');
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// Helper function to read JSON files
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Helper function to write to JSON files
async function writeJsonFile(filePath, data) {
  // Ensure directory exists
  const dir = path.dirname(filePath);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
  
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Endpoint to get a random destination with multiple-choice options
app.get('/api/destinations/random', async (req, res) => {
  try {
    const destinations = await readJsonFile(DESTINATIONS_FILE);
    
    if (!destinations.length) {
      return res.status(404).json({ message: 'No destinations found' });
    }
    
    // Select a random destination
    const randomIndex = Math.floor(Math.random() * destinations.length);
    const selectedDestination = destinations[randomIndex];
    
    // Create multiple-choice options (including the correct answer)
    const options = [selectedDestination];
    
    // Add 3 more random wrong options
    while (options.length < 4) {
      const wrongIndex = Math.floor(Math.random() * destinations.length);
      const wrongOption = destinations[wrongIndex];
      
      // Ensure we don't add duplicates
      if (!options.some(option => option.id === wrongOption.id)) {
        options.push(wrongOption);
      }
    }
    
    // Shuffle the options
    const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
    
    res.json({
      destination: selectedDestination,
      options: shuffledOptions
    });
    
  } catch (error) {
    console.error('Error getting random destination:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User endpoints
app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }
    
    const users = await readJsonFile(USERS_FILE);
    
    // Check if username already exists
    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    
    // Create new user
    const newUser = {
      id: uuidv4(),
      username,
      score: { correct: 0, incorrect: 0 },
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    await writeJsonFile(USERS_FILE, users);
    
    res.status(201).json(newUser);
    
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by username
app.get('/api/users/username/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const users = await readJsonFile(USERS_FILE);
    
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
    
  } catch (error) {
    console.error('Error fetching user by username:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    
    const users = await readJsonFile(USERS_FILE);
    
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user, maintaining the ID
    users[index] = { ...updatedUser, id };
    
    await writeJsonFile(USERS_FILE, users);
    
    res.json(users[index]);
    
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
