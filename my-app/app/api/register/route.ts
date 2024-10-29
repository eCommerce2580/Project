import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    // Check for existing user with the same email
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.isVerified) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.users.update({
          where: { email },
          data: {
            password: { create: { hash: hashedPassword } },
          },
        });

        return NextResponse.json(
          { message: "Password updated successfully", success: true },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { message: "Email is already registered", success: false },
        { status: 400 }
      );
    }

    // Hash the password for new users
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // Token valid for 1 hour

    // Create a new user with the token and expiry
    const user = await prisma.users.create({
      data: {
        email,
        name,
        password: { create: { hash: hashedPassword } },
        emailVerificationToken: token,
        emailTokenExpiry: tokenExpiry,
      },
    });

    // Send verification email
    const verificationUrl = `http://localhost:3000/verifyEmail/${token}/${email}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      text: `Please verify your email by clicking the link: ${verificationUrl}`,
      html: `<p>Please verify your email by clicking the link: <a href="${verificationUrl}">Verify Email</a></p>`,
    });

    return NextResponse.json({ message: "Verification email sent", success: true });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Failed to register user", success: false },
      { status: 500 }
    );
  }
}
