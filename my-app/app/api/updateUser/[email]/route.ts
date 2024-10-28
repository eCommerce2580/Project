import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: { email: string } }
) {
    try {
        const { email } = params;
        const body = await request.json();
        const { name, country, city, street, houseNumber, zipCode } = body;

        // Log the input data for debugging
        console.log(`Updating user with email: ${email}`, { name, country, city, street, houseNumber, zipCode });

        // Check if the address exists
        const addressRecord = await prisma.address.findUnique({
            where: { id: body.addressId }, // Assuming the address has an ID
        });

        // Update or create address if it doesn't exist
        let updatedAddress;
        if (addressRecord) {
            // Update existing address
            updatedAddress = await prisma.address.update({
                where: { id: body.addressId },
                data: {
                    country,
                    city,
                    street,
                    houseNumber,
                    zipCode,
                },
            });
        } else {
            // Create a new address
            updatedAddress = await prisma.address.create({
                data: {
                    country,
                    city,
                    street,
                    houseNumber,
                    zipCode,
                },
            });
        }

        // Update user data in the database
        const updatedUser = await prisma.users.update({
            where: { email: email },
            data: {
                name: name,
                addressId: updatedAddress.id, // Link to the updated/created address
            },
        });

        return NextResponse.json({ message: "User updated successfully", success: true, updatedUser });
    } catch (error: unknown) {
        console.error("Error updating user:", error);
    
        let errorMessage = "Error updating user";
    
        // Check if error is an instance of Error
        if (error instanceof Error) {
            errorMessage = error.message; // Use the error message if available
        }
    
        // Return a structured JSON response with the error message
        return NextResponse.json(
            { message: errorMessage, success: false },
            { status: 500 }
        );
    }
}
