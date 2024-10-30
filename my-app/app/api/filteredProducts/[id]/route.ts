
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: Request, { params }: { params: { categoryId: string, subCategoryId: string }}) {
  try {
    const { categoryId, subCategoryId } = params;
    
    const filteredProducts = await prisma.product.findMany({
      where: {
        categoryId: categoryId,
        subCategoryId: subCategoryId,
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
