import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category: string | null = searchParams.get("category");
        const subCategory: string | null = searchParams.get("subCategory");

        if (!category || !subCategory) {
            return NextResponse.json(
                { message: "Category or subcategory name missing", success: false },
                { status: 400 }
            );
        }

        const categoryId = await prisma.category.findFirst({
            where: { name: category },
            select: { id: true },
        });
        const subCategoryId = await prisma.subCategory.findFirst({
            where: {
                name: subCategory,
                categoryId: categoryId?.id,
            },
            select: { id: true },
        });

        const filteredProducts = await prisma.product.findMany({
            where: {
                categoryId: categoryId?.id,
                subCategoryId: subCategoryId?.id,
            },
        });

        return NextResponse.json({
            message: "Success",
            success: true,
            filteredProducts,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { message: "Error fetching products", success: false },
            { status: 500 }
        );
    }
}