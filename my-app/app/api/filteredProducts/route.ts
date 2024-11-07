import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category: string | null = searchParams.get("category");
        const subCategory: string | null = searchParams.get("subCategory");
        const color: string | null = searchParams.get("color");
        const size: string | null = searchParams.get("size");
        const sort: string | null = searchParams.get("sort");
        const userID: string | null = searchParams.get("userID");

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

        if (color) {
            const colors = color.split(",");
            filters.colors = {
                some: {
                    color: {
                        name: { in: colors },
                    },
                },
            };
        }

        if (size) {
            const sizes = size.split(",");
            filters.sizes = {
                some: {
                    size: {
                        label: { in: sizes },
                    },
                },
            };
        }

        const favorites = prisma.favorites.findMany({
            where: {
                userId: userID!,
            },
        });

       

        const products = prisma.product.findMany({
            where: filters,
            orderBy: orderBy,
        });

        const [filteredProducts,fav]= await Promise.all([products,favorites])
        console.log(filteredProducts)
        console.log(fav)
 
        return NextResponse.json({
            message: "Success",
            success: true,
            filteredProducts,
            fav,
        });


    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { message: "Error fetching products", success: false },
            { status: 500 }
        );
    }
}