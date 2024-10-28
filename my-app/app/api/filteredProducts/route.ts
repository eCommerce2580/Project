

// import { NextResponse } from "next/server";
// import prisma from "@/prisma/client";

// export async function GET(request: Request,  { params }: { params: { id: string }}) {
//   try {
//     const categoryId = params.categoryId;
//     const filteredSubCategory = await prisma.subCategory.findMany({
//       where: { categoryId: categoryId },
//     });
// console.log(filteredSubCategory)
//     return NextResponse.json({
//       message: "Success",
//       success: true,
//       filteredSubCategory,
//     });
//   } catch (error) {
//     console.error("Error fetching subcategories:", error);
//     return NextResponse.json(
//       { message: "Error fetching subcategories", success: false },
//       { status: 500 }
//     );
//   }
// }
