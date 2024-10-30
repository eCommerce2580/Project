"use client";
import { useState, useEffect } from "react";
import React from 'react'

import FilterProduct from './FilterProduct';
import axios from "axios"
import Product from "@/components/ui/Product";

export type categoryAndSubId ={
    categoryId: string,
    subCategoryId: string
  }

  export default function Store({ categoryIdAndSubId  }: { categoryIdAndSubId: categoryAndSubId }) {
    const [products, setProducts] = useState<any[]>([]);


  useEffect(() => {
    const fetchProducts = async () => {
      console.log(categoryIdAndSubId);
      try {
        const { data } = await axios.get(`/api/filteredProducts/${categoryIdAndSubId}`);
        setProducts(data.filteredProducts);
        console.log(data.filteredProducts);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }};
    fetchProducts();
  }, []);

  
  return (
    <>
   <div className="font-[sans-serif] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
        <div className="flex">
            {/* Filter Product on the left side */}
          <div className="lg:w-1/4 w-full">
            <FilterProduct />
          </div>
          
          {/* Products Grid on the right side */}
          <div className="lg:w-3/4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
