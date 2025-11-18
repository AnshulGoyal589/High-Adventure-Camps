import jsPDF from 'jspdf';
import { Booking, Tour } from './types';

export function generateBookingReceipt(booking: Booking, tour: Tour): Buffer {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Colors
  const primaryRed: [number, number, number] = [204, 0, 0];
  const darkBlack: [number, number, number] = [0, 0, 0];
  const lightGray: [number, number, number] = [245, 245, 245];

  // Header
  doc.setFillColor(...primaryRed);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('HIGH ADVENTURE CAMPS', pageWidth / 2, 15, { align: 'center' });
  doc.setFontSize(10);
  doc.text('Adventure Tours in Manali', pageWidth / 2, 25, { align: 'center' });
  doc.text('Booking Confirmation Receipt', pageWidth / 2, 33, { align: 'center' });

  // Reference Section
  doc.setDrawColor(...primaryRed);
  doc.setLineWidth(0.5);
  doc.rect(10, 48, pageWidth - 20, 20);
  
  doc.setTextColor(...darkBlack);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('BOOKING REFERENCE', 15, 54);
  doc.setFont('helvetica', 'normal');
  doc.text(String(booking._id), 15, 62);

  // Booking Details
  let yPosition = 75;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('BOOKING DETAILS', 15, yPosition);
  
  yPosition += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const bookingDetails = [
    [`Package: ${tour.title}`, `Duration: ${tour.duration.days} Days / ${tour.duration.nights} Nights`],
    [`Start Date: ${new Date(booking.startDate).toLocaleDateString('en-IN')}`, `Travelers: ${booking.numberOfPeople}`],
    [`Location: ${tour.location}`, `Difficulty: ${tour.difficulty}`],
  ];

  bookingDetails.forEach(([left, right]) => {
    doc.text(left, 15, yPosition);
    doc.text(right, pageWidth / 2, yPosition);
    yPosition += 7;
  });

  // Guest Information
  yPosition += 5;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('GUEST INFORMATION', 15, yPosition);
  
  yPosition += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  doc.text(`Name: ${booking.customerDetails.fullName}`, 15, yPosition);
  yPosition += 7;
  doc.text(`Email: ${booking.customerDetails.email}`, 15, yPosition);
  yPosition += 7;
  doc.text(`Phone: ${booking.customerDetails.phone}`, 15, yPosition);
  yPosition += 7;
  doc.text(`Address: ${booking.customerDetails.address}`, 15, yPosition);

  // Price Summary
  yPosition += 12;
  doc.setFillColor(...lightGray);
  doc.rect(15, yPosition, pageWidth - 30, 35, 'F');
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PRICE SUMMARY', 20, yPosition + 7);
  
  yPosition += 15;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  doc.text('Price per Person:', 20, yPosition);
  doc.text(`₹${tour.price.toLocaleString()}`, pageWidth - 25, yPosition, { align: 'right' });
  
  yPosition += 8;
  doc.text(`Number of Travelers (${booking.numberOfPeople}x):`, 20, yPosition);
  doc.text(`₹${(tour.price * booking.numberOfPeople).toLocaleString()}`, pageWidth - 25, yPosition, { align: 'right' });
  
  yPosition += 12;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryRed);
  doc.setFontSize(12);
  doc.text('TOTAL AMOUNT:', 20, yPosition);
  doc.text(`₹${booking.totalPrice.toLocaleString()}`, pageWidth - 25, yPosition, { align: 'right' });

  // Highlights
  yPosition += 15;
  doc.setTextColor(...darkBlack);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PACKAGE HIGHLIGHTS', 15, yPosition);
  
  yPosition += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  tour.highlights.slice(0, 3).forEach((highlight) => {
    doc.text(`• ${highlight}`, 20, yPosition);
    yPosition += 5;
  });

  // What's Included
  yPosition += 5;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text("WHAT'S INCLUDED", 15, yPosition);
  
  yPosition += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  tour.includeItems.slice(0, 3).forEach((item) => {
    doc.text(`• ${item}`, 20, yPosition);
    yPosition += 5;
  });

  // Footer
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text(
    'Thank you for choosing High Adventure Camps! Confirmation email with itinerary has been sent to your email address.',
    pageWidth / 2,
    pageHeight - 15,
    { align: 'center', maxWidth: pageWidth - 20 }
  );

  return Buffer.from(doc.output('arraybuffer'));
}
