import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name, description, price, image, amount, sales, category, subCategory, employeeId } = await request.json();

        // Create the product with all required fields
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                image,
                amount,
                sales,
                category: {
                    connect: { id: category } // Connect to existing Category by ID
                },
                subCategory: {
                    connect: { id: subCategory } // Connect to existing SubCategory by ID
                },
                employee: {
                    connect: { id: employeeId } // Connect to existing Employee by ID
                }
            },
            include: {
                category: true,
                subCategory: true,
                employee: true,
            }
        });

        return NextResponse.json({ message: "Product created successfully", success: true, product });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ message: "Failed to create product", success: false }, { status: 500 });
    }
}
