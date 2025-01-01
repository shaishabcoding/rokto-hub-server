import nodemailer from "nodemailer";
import config from "../config";

export const sendMail = async ({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.node_env !== "development",
    auth: {
      user: config.mail,
      pass: config.mail_pass,
    },
  });

  await transporter.sendMail({
    from: config.mail,
    to,
    subject,
    html: body,
  });
};
