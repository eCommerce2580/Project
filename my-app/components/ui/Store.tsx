"use client";
import { useState, useEffect } from "react";
import React from "react";

import FilterProduct from "./FilterProduct";
import axios from "axios";
import Product from "@/components/ui/Product";

export type categoryAndSubId = {
  category: string;
  subCategory: string;
};

export default function Store({
  categoryIdAndSubId,
}: {
  categoryIdAndSubId: categoryAndSubId;
}) {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const { category, subCategory } = categoryIdAndSubId;

    try {
      const { data } = await axios.get(
        `/api/filteredProducts?category=${category}&subCategory=${subCategory}`
      );
      
      setProducts(data.filteredProducts);
      console.log(data.filteredProducts);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [categoryIdAndSubId]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full">
        <FilterProduct categoryIdAndSubId={categoryIdAndSubId}/>
      </div>
    </div>
  );
}
