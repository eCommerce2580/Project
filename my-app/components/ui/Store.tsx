"use client";
import { useState, useEffect } from "react";
import React from 'react'

import FilterProduct from './FilterProduct';
import axios from "axios"
import Product from "@/components/ui/Product";

export type categoryAndSubId ={
    category: string,
    subCategory: string
  }

  export default function Store({ categoryIdAndSubId  }: { categoryIdAndSubId: categoryAndSubId }) {
    const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
  const fetchProducts = async () => {
    const { category, subCategory } = categoryIdAndSubId;

    try {
      const { data } = await axios.get(`/api/filteredProducts?category=${category}&subCategory=${subCategory}`);
      setProducts(data.filteredProducts);
      console.log(data.filteredProducts);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };
  fetchProducts();
}, [categoryIdAndSubId]);

  return (
    <>
  <div className="font-[sans-serif] py-4 w-full">
  <div className="flex">
    {/* Filter Product on the left side */}
    <div className="lg:w-1/4 w-full">
      <FilterProduct />
    </div>
  </div>
</div>

    </>
  )
}