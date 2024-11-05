import cloudinary from "@/lib/cloudinary";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {     
        const formData = await request.formData();
        console.log(formData);
        const file = formData.get("file") as File;
        const fileBuffer = await file.arrayBuffer();
        const mimeType = file.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");
        const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
        const result = await cloudinary.uploader.upload(fileUri)
        const image = result.secure_url
        const name = formData.get("name")!.toString();
        const description = formData.get("description")!.toString();;
        const price = parseFloat(formData.get("price")!.toString());
        const amount = parseInt(formData.get("amount")!.toString());
        const sales = parseInt(formData.get("sales")!.toString());
        const categoryId = formData.get("category")!.toString();
        const subCategoryId = formData.get("subCategory")!.toString();
        const employeeId = formData.get("employeeId")!.toString();

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                image,
                amount,
                sales,
                category: {
                    connect: { id: categoryId }
                },
                subCategory: {
                    connect: { id: subCategoryId }
                },
                employee: {
                    connect: { id: employeeId }
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
