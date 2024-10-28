import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: { email: string } }
) {
    try {
        const { email } = params;
        const body = await request.json();
        const { name, country, city, street, houseNumber, zipCode, addressId } = body;

        console.log(`Updating user with email: ${email}`, { name, country, city, street, houseNumber, zipCode, addressId });

        // Find the user
        const user = await prisma.users.findUnique({
            where: { email: email },
            include: { address: true }, // כולל את הכתובת הקיימת
        });

        if (!user) {
            throw new Error("User not found.");
        }

        let updatedAddress;

        if (addressId) {
            // אם יש addressId, נעדכן את הכתובת הקיימת
            updatedAddress = await prisma.address.update({
                where: { id: addressId },
                data: {
                    country,
                    city,
                    street,
                    houseNumber,
                    zipCode,
                },
            });
        } else {
            // אם אין addressId, ניצור כתובת חדשה
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

        // עדכן את שם המשתמש
        const updatedUser = await prisma.users.update({
            where: { email: email },
            data: {
                name: name,
                addressId: updatedAddress.id, // אם הכתובת התעדכנה או נוצרה, עדכן את ה-ID
            },
        });

        return NextResponse.json({ message: "User updated successfully", success: true, updatedUser });
    } catch (error: unknown) {
        console.error("Error updating user:", error);

        let errorMessage = "Error updating user";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json(
            { message: errorMessage, success: false },
            { status: 500 }
        );
    }
}
