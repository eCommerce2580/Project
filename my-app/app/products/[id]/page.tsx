import React from 'react'
import axios from "axios";
import FetchProduct from '@/components/ui/fetchProduct';
import SubCategories from '../../../components/ui/subCategories';
import prisma from "@/prisma/client";

export default async function Page({ params }: { params: { id: string } }) {
  let categoryId;
  
  // חיפוש קטגוריה לפי שם
  const category_ = await prisma.category.findFirst({
    where: {
      name: params.id  // מסנן לפי שם הקטגוריה המתקבל מהפרונטאנד
    }
  });
 
  if (category_) {
    categoryId = category_.id;
  }
  const filteredSubCategory = await prisma.subCategory.findMany({
    where: {
      categoryId: categoryId ? { equals: categoryId } : undefined
    }
  });
  //  (filter: {minPrice:number, maxPrice:number,category:string, color: string});
console.log("ubvbunvbv");
console.log(filteredSubCategory);

  return (
    <>
      <div className="font-[sans-serif] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        </div>
      </div>
      <SubCategories subCategory={filteredSubCategory} categoryName={params.id}/>
    </>
  )
}
