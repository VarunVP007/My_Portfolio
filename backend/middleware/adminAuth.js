/**
 * adminAuth — Simple secret-header middleware for protecting admin-only routes.
 * Set ADMIN_SECRET=<random-uuid> in your backend .env
 */
const adminAuth = (req, res, next) => {
  const provided = req.headers['x-admin-secret'];
  const expected = process.env.ADMIN_SECRET;

  if (!expected) {
    // If ADMIN_SECRET is not set at all, deny access and warn the developer
    console.warn('⚠️  ADMIN_SECRET is not set in .env — admin routes are locked.');
    return res.status(503).json({ success: false, message: 'Admin access is not configured.' });
  }

  if (!provided || provided !== expected) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid or missing admin secret.' });
  }

  next();
};

module.exports = adminAuth;
