import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});


const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, html });
  } catch (err) {
    logger.error(`Failed to send email to ${to}: ${err.message}`);
  }
};

const sendOrderConfirmation = async (order, userEmail) => {
  const itemsHtml = order.orderItems
    .map((i) => `<li>${i.name} x${i.quantity} — $${(i.price * i.quantity).toFixed(2)}</li>`)
    .join('');

  await sendEmail({
    to: userEmail,
    subject: `Order Confirmation #${order._id}`,
    html: `<h2>Thanks for your order!</h2><ul>${itemsHtml}</ul><p>Total: $${order.totalPrice.toFixed(2)}</p>`,
  });
};

const sendWelcomeEmail = async (userEmail, name) => {
  await sendEmail({
    to: userEmail,
    subject: 'Welcome!',
    html: `<h2>Welcome, ${name}!</h2><p>Thanks for creating an account with us.</p>`,
  });
};

export { sendEmail, sendOrderConfirmation, sendWelcomeEmail };
