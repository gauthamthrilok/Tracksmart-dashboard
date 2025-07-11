const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/User'); // Adjust path

// Setup Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails?.[0]?.value;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return done(null, existingUser);
    } else {
      console.log("User not found.");
      return done(null, false, { message: 'User not found' });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id); // Optional: use full user or just _id
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Routes
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('http://localhost:5173');
  } else {
    res.redirect('/auth/google');
  }
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/unauthorised' }),
  (req, res) => {
    res.redirect('http://localhost:5173');
  }
);

router.get('/unauthorised', (req, res) => {
  res.status(403).send("Access denied. Log in with authorized email.");
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

router.get('/api/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

module.exports = router;
