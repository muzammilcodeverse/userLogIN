const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import User model
const User = require('./models/User');

// Sample user data
const users = [
  { name: 'John Smith', email: 'john.smith@example.com' },
  { name: 'Emily Johnson', email: 'emily.johnson@example.com' },
  { name: 'Michael Brown', email: 'michael.brown@example.com' },
  { name: 'Sarah Davis', email: 'sarah.davis@example.com' },
  { name: 'David Wilson', email: 'david.wilson@example.com' },
  { name: 'Jennifer Taylor', email: 'jennifer.taylor@example.com' },
  { name: 'Robert Anderson', email: 'robert.anderson@example.com' },
  { name: 'Lisa Thomas', email: 'lisa.thomas@example.com' },
  { name: 'Daniel Martinez', email: 'daniel.martinez@example.com' },
  { name: 'Jessica Robinson', email: 'jessica.robinson@example.com' },
  { name: 'Christopher Lee', email: 'christopher.lee@example.com' },
  { name: 'Amanda Walker', email: 'amanda.walker@example.com' },
  { name: 'Matthew Hall', email: 'matthew.hall@example.com' },
  { name: 'Olivia Allen', email: 'olivia.allen@example.com' },
  { name: 'Andrew Young', email: 'andrew.young@example.com' },
  { name: 'Sophia King', email: 'sophia.king@example.com' },
  { name: 'James Wright', email: 'james.wright@example.com' },
  { name: 'Emma Scott', email: 'emma.scott@example.com' },
  { name: 'Benjamin Green', email: 'benjamin.green@example.com' },
  { name: 'Ava Baker', email: 'ava.baker@example.com' },
  { name: 'William Adams', email: 'william.adams@example.com' },
  { name: 'Mia Nelson', email: 'mia.nelson@example.com' },
  { name: 'Alexander Carter', email: 'alexander.carter@example.com' },
  { name: 'Charlotte Mitchell', email: 'charlotte.mitchell@example.com' },
  { name: 'Ethan Perez', email: 'ethan.perez@example.com' },
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Function to seed users
const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash password for all users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create user objects with hashed password
    const userObjects = users.map(user => ({
      ...user,
      password: hashedPassword
    }));

    // Insert users
    await User.insertMany(userObjects);
    console.log(`${users.length} users seeded successfully`);

    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('MongoDB disconnected');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    mongoose.disconnect();
    process.exit(1);
  }
};

// Run the seed function
seedUsers();
