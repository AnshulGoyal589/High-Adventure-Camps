import nodemailer from 'nodemailer';
import { Booking, Tour } from './types';

// Configure your email service
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_FROM || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
});

export async function sendBookingConfirmation(
  booking: Booking,
  tour: Tour
) {
  const bookingDate = new Date(booking.startDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #cc0000 0%, #000000 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { background: #f9f9f9; padding: 30px; }
          .booking-details { background: white; border: 1px solid #ddd; padding: 20px; margin: 20px 0; border-radius: 6px; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .detail-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #666; }
          .value { color: #333; }
          .total-row { font-size: 18px; font-weight: bold; color: #cc0000; background: #f0f0f0; padding: 15px; margin-top: 15px; border-radius: 4px; }
          .button { display: inline-block; background: #cc0000; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          .footer { background: #000; color: white; text-align: center; padding: 20px; font-size: 12px; }
          .reference { background: #fff; border-left: 4px solid #cc0000; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Confirmed!</h1>
            <p>Your adventure is booked and ready</p>
          </div>
          
          <div class="content">
            <h2>Dear ${booking.customerDetails.fullName},</h2>
            <p>Thank you for booking with High Adventure Camps! We're thrilled to have you join us for an unforgettable adventure.</p>
            
            <div class="reference">
              <strong>Booking Reference:</strong> ${booking._id}
            </div>
            
            <h3>Package Details</h3>
            <div class="booking-details">
              <div class="detail-row">
                <span class="label">Package Name:</span>
                <span class="value">${tour.title}</span>
              </div>
              <div class="detail-row">
                <span class="label">Duration:</span>
                <span class="value">${tour.duration.days} Days / ${tour.duration.nights} Nights</span>
              </div>
              <div class="detail-row">
                <span class="label">Start Date:</span>
                <span class="value">${bookingDate}</span>
              </div>
              <div class="detail-row">
                <span class="label">Number of Travelers:</span>
                <span class="value">${booking.numberOfPeople}</span>
              </div>
              <div class="detail-row">
                <span class="label">Price per Person:</span>
                <span class="value">₹${tour.price.toLocaleString()}</span>
              </div>
              <div class="total-row">
                Total Amount Paid: ₹${booking.totalPrice.toLocaleString()}
              </div>
            </div>
            
            <h3>What's Next?</h3>
            <ol>
              <li>Your booking is confirmed and payment received</li>
              <li>We'll send detailed itinerary and packing list in next email</li>
              <li>Our team will contact you 7 days before departure</li>
              <li>Pack your bags and get ready for adventure!</li>
            </ol>
            
            <p><strong>Need Help?</strong> Contact our support team:</p>
            <p>Email: support@highventurecamps.com</p>
            <p>Phone: +91 XXXXX XXXXX</p>
            
            <p>Best regards,<br><strong>High Adventure Camps Team</strong></p>
          </div>
          
          <div class="footer">
            <p>High Adventure Camps | Adventure Tours in Manali</p>
            <p>© 2025 All Rights Reserved</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: booking.customerDetails.email,
      subject: `Booking Confirmed - ${tour.title} - Reference: ${booking._id}`,
      html: emailHtml,
    });
    return true;
  } catch (error) {
    console.error('Error sending booking email:', error);
    return false;
  }
}

export async function sendAdminBookingNotification(booking: Booking, tour: Tour) {
  const bookingDate = new Date(booking.startDate).toLocaleDateString('en-IN');

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .details { background: white; border: 1px solid #ddd; padding: 15px; }
          .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Booking Notification</h2>
          </div>
          <div class="content">
            <h3>${tour.title}</h3>
            <div class="details">
              <div class="row">
                <strong>Booking ID:</strong> ${booking._id}
              </div>
              <div class="row">
                <strong>Customer:</strong> ${booking.customerDetails.fullName}
              </div>
              <div class="row">
                <strong>Email:</strong> ${booking.customerDetails.email}
              </div>
              <div class="row">
                <strong>Phone:</strong> ${booking.customerDetails.phone}
              </div>
              <div class="row">
                <strong>Date:</strong> ${bookingDate}
              </div>
              <div class="row">
                <strong>Travelers:</strong> ${booking.numberOfPeople}
              </div>
              <div class="row">
                <strong>Total Amount:</strong> ₹${booking.totalPrice}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_FROM || '',
      subject: `New Booking: ${tour.title} - ${booking.customerDetails.fullName}`,
      html: emailHtml,
    });
    return true;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return false;
  }
}
