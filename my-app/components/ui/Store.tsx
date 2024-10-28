"use client";
import { useState, useEffect } from "react";
import React from 'react'
import Product from './Product';
import FilterProduct from './FilterProduct';
import axios from "axios"


export default function Store() {
  const [products, setProducts] = useState([]);

  type categoryAndSubId ={
    categoryId: string,
    subCategoryId: string
  }
  // const products = [
  //   {
  //     id: '1',
  //     name: 'Sole Elegance',
  //     description: '5 types of shoes available',
  //     price: 10.5,
  //     imageUrl: 'https://readymadeui.com/images/product9.webp',
  //   },
  //   {
  //     id: '2',
  //     name: 'Urban Sneakers',
  //     description: '5 types of shoes available',
  //     price: 12.5,
  //     imageUrl: 'https://readymadeui.com/images/product10.webp',
  //   },
  //   {
  //     id: '3',
  //     name: 'Velvet Boots',
  //     description: '5 types of shoes available',
  //     price: 14.5,
  //     imageUrl: 'https://readymadeui.com/images/product11.webp',
  //   },
  //   {
  //     id: '4',
  //     name: 'Summit Hiking',
  //     description: '5 types of shoes available',
  //     price: 12.5,
  //     imageUrl: 'https://readymadeui.com/images/product12.webp',
  //   },
  // ];
  // useEffect(() => {
  //   const fetchProducts = async (categoryAndSubId: categoryAndSubId) => {
  //     console.log(categoryAndSubId);
  //     try {
  //       const { data } = await axios.get(`/api/filteredProducts/${categoryAndSubId}`);
  //       setProducts(data.filteredProducts);
  //       console.log(data.filteredProducts);
  //     } catch (error) {
  //       console.error("Error fetching subcategories:", error);
  //     }};
  //   fetchProducts("");
  // }, []);
  
  
  return (
    <>
   <div className="font-[sans-serif] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">Premium Sneakers</h2>
        <div className="flex">
            {/* Filter Product on the left side */}
          <div className="lg:w-1/4 w-full">
            <FilterProduct />
          </div>
          
          {/* Products Grid on the right side */}
          <div className="lg:w-3/4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* {products.map((product) => (
                // <Product key={product.id} product={product} />
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
