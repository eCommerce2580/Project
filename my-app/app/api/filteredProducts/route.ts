import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category: string | null = searchParams.get("category");
        const subCategory: string | null = searchParams.get("subCategory");
        const color: string | null = searchParams.get("color");
        const size: string | null = searchParams.get("size");

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

        const filters: any = {
            categoryId: categoryId?.id,
            subCategoryId: subCategoryId?.id,
        };

        // הוספת סינון לפי צבע אם קיים
        if (color) {
            const colors = color.split(","); // מניחים שהצבעים מופרדים בפסיק
            filters.colors = {
                some: {
                    color: {
                        name: { in: colors },
                    },
                },
            };
        }

        // הוספת סינון לפי מידה אם קיים
        if (size) {
            const sizes = size.split(","); // מניחים שהמידות מופרדות בפסיק
            filters.sizes = {
                some: {
                    size: {
                        label: { in: sizes },
                    },
                },
            };
        }

        const filteredProducts = await prisma.product.findMany({
            where: filters,
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
