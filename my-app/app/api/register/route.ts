import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, name, password, address } = await request.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with all required fields
    const user = await prisma.users.create({
      data: {
        email,
        name,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
        address: address ? {
          create: {
            country: address.country,
            city: address.city,
            street: address.street,
            houseNumber: address.houseNumber,
            zipCode: address.zipCode,
          },
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
