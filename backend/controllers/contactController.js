const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

/**
 * Helper to send email notification
 */
const sendEmailNotification = async (contactData) => {
  try {
    const recipient = process.env.RECEIVER_EMAIL || process.env.EMAIL_TO;
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !recipient) {
      console.warn('⚠️ Nodemailer: Missing environment variables EMAIL_USER, EMAIL_PASS, and recipient (RECEIVER_EMAIL or EMAIL_TO). Skipping email notification.');
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Bypasses local SSL certificate issues on Windows
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: `📬 New Portfolio Message: ${contactData.subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; color: #0f172a;">
          <h2 style="color: #2563eb; margin-top: 0;">New portfolio message received!</h2>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f1f5f9; padding: 16px; border-left: 4px solid #2563eb; border-radius: 4px; margin: 16px 0; font-style: italic;">
            ${contactData.message.replace(/\n/g, '<br/>')}
          </blockquote>
          <hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 24px 0;" />
          <p style="font-size: 0.75rem; color: #64748b; margin-bottom: 0;">Submitted on: ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Nodemailer: Email notification sent successfully!');
  } catch (err) {
    console.error('❌ Nodemailer Error:', err.message);
  }
};

/**
 * @desc    Submit a contact form message
 * @route   POST /api/contact
 * @access  Public
 */
const submitContact = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { name, email, subject, message } = req.body;

    let contact;
    try {
      contact = await Contact.create({
        name,
        email,
        subject,
        message,
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
      });
      // Send email asynchronously
      sendEmailNotification({ name, email, subject, message });
    } catch (dbError) {
      console.warn('⚠️ Could not save contact to MongoDB:', dbError.message);
      // Try sending email as fallback
      sendEmailNotification({ name, email, subject, message });
      
      // Fallback response if DB is offline
      return res.status(200).json({
        success: true,
        message: 'Your message has been received! I will get back to you soon.',
        data: { name, email, createdAt: new Date() },
      });
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! I will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all contact messages
 * @route   GET /api/contact
 * @access  Private (Admin)
 */
const getContacts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;
    const skip = (page - 1) * limit;

    const query = status ? { status } : {};

    const [contacts, total] = await Promise.all([
      Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update contact status
 * @route   PATCH /api/contact/:id
 * @access  Private (Admin)
 */
const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContact, getContacts, updateContactStatus };
