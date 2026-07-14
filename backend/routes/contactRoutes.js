const express = require('express');
const { body } = require('express-validator');
const { submitContact, getContacts, updateContactStatus } = require('../controllers/contactController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Validation middleware
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 5, max: 200 }).withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
];

// Public route — anyone can submit a contact form
router.post('/', contactValidation, submitContact);

// Admin-only routes — require X-Admin-Secret header
router.get('/', adminAuth, getContacts);
router.patch('/:id', adminAuth, updateContactStatus);

module.exports = router;
