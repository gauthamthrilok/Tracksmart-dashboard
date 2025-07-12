const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/AuthRoutes');
const cors = require('cors');

require('dotenv').config();

const app = express();


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // must be true to allow cookies
}));

// Session middleware (must be before passport.session())
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Mount routes
app.use('/authorisation', authRoutes); // or '/auth' if all routes are under /auth

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
