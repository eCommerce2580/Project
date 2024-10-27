// pages/api/register.ts
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, name, password, address } = await request.json();

    // Hash the password if provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Create or update the user based on email existence
    const user = await prisma.users.upsert({
      where: { email },
      update: {
        name,
        password: hashedPassword ? {
          create: { hash: hashedPassword },
        } : undefined,
        address: address ? {
          upsert: {
            update: { ...address },
            create: { ...address },
          },
        } : undefined,
      },
      create: {
        email,
        name,
        password: hashedPassword ? {
          create: { hash: hashedPassword },
        } : undefined,
        address: address ? {
          create: { ...address },
        } : undefined,
      },
      include: {
        password: true,
        address: true,
      },
    });

    // Remove the password hash from the response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ message: "User registered successfully", success: true, user: userWithoutPassword });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ message: "Failed to register user", success: false }, { status: 500 });
  }
}
