import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: process.env.EMAIL_SERVER_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `http://localhost:3000/activate/${token}`; // Update to your actual URL
  // Update to your actual URL

  try {
    await transporter.sendMail({
      from: '"Blog Authentication App" <blog@info.com>', // Add a clear sender address
      to: email,
      subject: "Verify Your Email",
      html: `Please click on the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`,
    });
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}