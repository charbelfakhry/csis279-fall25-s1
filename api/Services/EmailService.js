/**
 * EmailService class for sending emails using Nodemailer.
 *
 * This class provides functionality to send emails with various options including
 * recipients (to and cc), subject, body, attachments, and HTML content.
 * It allows sending both single and bulk emails in a structured manner.
 *
 * Usage:
 *
 * 1. Import the EmailService class:
 *    const EmailService = require('./EmailService');
 *
 * 2. Create an instance of EmailService with the transporter configuration:
 *    const emailService = new EmailService({
 *        service: 'YourEmailService', // e.g., 'Gmail'
 *        user: 'your-email@example.com',
 *        pass: 'your-email-password'
 *    });
 *
 * 3. Use the sendSingle method to send a single email:
 *    emailService.sendSingle({
 *        to: 'recipient@example.com',
 *        subject: 'Your Subject',
 *        body: 'Your email body text',
 *        cc: ['cc@example.com'], // Optional
 *        attachments: [{ filename: 'file.txt', path: '/path/to/file.txt' }], // Optional
 *        html: '<h1>Your HTML content</h1>' // Optional
 *    });
 *
 * 4. Use the sendBulk method to send multiple emails:
 *    emailService.sendBulk({
 *        tos: ['recipient1@example.com', 'recipient2@example.com'],
 *        subject: 'Your Bulk Subject',
 *        body: 'Your email body text',
 *        cc: ['cc@example.com'], // Optional
 *        attachments: [{ filename: 'file.txt', path: '/path/to/file.txt' }], // Optional
 *        html: '<h1>Your HTML content</h1>' // Optional
 *    });
 *
 * Parameters for sendSingle:
 * - to (string): The email address of the primary recipient.
 * - subject (string): The subject line of the email.
 * - body (string): The plain text body of the email.
 * - cc (array): Optional. An array of email addresses to send carbon copies.
 * - attachments (array): Optional. An array of objects representing attachments.
 * - html (string): Optional. HTML content for the email body.
 *
 * Parameters for sendBulk:
 * - tos (array): An array of email addresses for multiple recipients.
 * - subject (string): The subject line of the email.
 * - body (string): The plain text body of the email.
 * - cc (array): Optional. An array of email addresses to send carbon copies.
 * - attachments (array): Optional. An array of objects representing attachments.
 * - html (string): Optional. HTML content for the email body.
 *
 * Note: Ensure to handle any errors that may arise during the sending process
 * by wrapping the method calls in try-catch blocks or using promise chaining.
 */

//TODO replace logging with errors

const nodemailer = require('nodemailer');

class EmailService {
    /**
     * Creates an instance of EmailService.
     * @param {Object} config - Configuration for the email service.
     * @param {string} config.service - The email service provider (e.g., Gmail, Outlook).
     * @param {string} config.user - The email address used to send emails (also the "from" address).
     * @param {string} config.pass - The password or app-specific password for the email address.
     */
    constructor({ service, user, pass }) {
        this.transporter = nodemailer.createTransport({
            service,
            auth: {
                user,
                pass
            }
        });

        this.from = user; // Set the "from" address to the user (email) used in transporter auth
    }

    /**
     * Sends a single email.
     * @param {Object} email - Email details.
     * @param {string} email.to - The recipient's email address.
     * @param {string} email.subject - The subject of the email.
     * @param {string} email.body - The body text of the email.
     * @param {Array} [email.attachments=[]] - Optional array of attachments.
     * @param {Array} [email.cc=[]] - Optional array of CC recipients.
     * @param {string} [email.html] - Optional HTML body for the email.
     * @returns {Promise<void>} - Returns a promise that resolves when the email is sent.
     */
    SendSingle = async ({ to, subject, body, attachments = [], cc = [], html }) => {
        const mailOptions = {
            from: this.from,
            to,
            subject,
            text: body,
            attachments,
            cc,
            html // Include HTML body if provided
        };

        try {
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Single email sent:', result);
        } catch (error) {
            console.error('Error sending single email:', error);
        }
    };

    /**
     * Sends bulk emails to multiple recipients.
     * @param {Object} email - Email details.
     * @param {Array<string>} email.tos - The recipients' email addresses.
     * @param {string} email.subject - The subject of the email.
     * @param {string} email.body - The body text of the email.
     * @param {Array} [email.attachments=[]] - Optional array of attachments.
     * @param {Array} [email.cc=[]] - Optional array of CC recipients.
     * @param {string} [email.html] - Optional HTML body for the email.
     * @returns {Promise<void>} - Returns a promise that resolves when all emails are sent.
     */
    SendBulk = async ({ tos, subject, body, attachments = [], cc = [], html }) => {
        const mailOptionsList = tos.map(to => ({
            from: this.from,
            to,
            subject,
            text: body,
            attachments,
            cc,
            html // Include HTML body if provided
        }));

        try {
            const results = await Promise.all(mailOptionsList.map(opt => this.transporter.sendMail(opt)));
            console.log('Bulk emails sent:', results);
        } catch (error) {
            console.error('Error sending bulk emails:', error);
        }
    };
}

module.exports = EmailService;
