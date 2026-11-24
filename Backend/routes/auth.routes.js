import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from '../passport.js';
import { registerUser, loginUser, getMe } from '../controllers/auth.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';

const router = Router();

// Local auth
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authUser, getMe);

// Google OAuth
router.get('/google', (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.status(501).json({ success: false, message: 'Google OAuth not configured in .env' });
  }
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get(
  '/google/callback',
  (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/auth/login?error=oauth_unconfigured`);
    }
    passport.authenticate('google', { session: false, failureRedirect: '/auth/login' })(req, res, next);
  },
  (req, res) => {
    const token = req.user?._id
      ? jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
      : '';
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/auth/callback?token=${token}`);
  }
);

// GitHub OAuth
router.get('/github', (req, res, next) => {
  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    return res.status(501).json({ success: false, message: 'GitHub OAuth not configured in .env' });
  }
  passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
});

router.get(
  '/github/callback',
  (req, res, next) => {
    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
      return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/auth/login?error=oauth_unconfigured`);
    }
    passport.authenticate('github', { session: false, failureRedirect: '/auth/login' })(req, res, next);
  },
  (req, res) => {
    const token = req.user?._id
      ? jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
      : '';
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/auth/callback?token=${token}`);
  }
);

export default router;