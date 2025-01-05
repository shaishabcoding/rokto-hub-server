import nodemailer from "nodemailer";
import config from "../config";

/**
 * Sends an email using the nodemailer transport with the specified details.
 *
 * @param to - The recipient's email address.
 * @param subject - The subject of the email.
 * @param body - The HTML body content of the email.
 */
export const sendMail = async ({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) => {
  // Create a transporter using SMTP service (Gmail)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.node_env !== "development", // Use secure connection in production
    auth: {
      user: config.mail,
      pass: config.mail_pass,
    },
  });

  // Send the email
  await transporter.sendMail({
    from: config.mail,
    to,
    subject,
    html: body,
  });
};
