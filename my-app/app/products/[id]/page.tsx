import React from 'react'
import Product from '../../../components/ui/Product';
import axios from "axios";
import FetchProduct from '@/components/ui/fetchProduct';
import SubCategories from '../../../components/ui/subCategories';
import prisma from "@/prisma/client";

export default async function Page({ params }: { params: any }) {
  let categoryId;
  const category_ = await prisma.category.findFirst({
    where: {
      name: params.id  // Filter category by name received from frontend
    }
  });

  if (category_) {
    categoryId = category_.id;
  }
  const filteredSubCategory = await prisma.subCategory.findMany({
    where: {
      // price: {
      //     gte: filter.minPrice !== null ? filter.minPrice : undefined,
      //     lte: filter.maxPrice !== null ? filter.maxPrice : undefined
      // },
      // name: {
      //     contains: filter.searchString != null ? filter.searchString : undefined
      // },
      categoryId: categoryId !== null ? { equals: categoryId } : undefined
    }
  });
  //  (filter: {minPrice:number, maxPrice:number,category:string, color: string});


  return (
    <>
      <div className="font-[sans-serif] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">Premium Sneakers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        </div>
      </div>
      <SubCategories />
    </>
  )
}
