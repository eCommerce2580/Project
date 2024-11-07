"use client"

import { useState } from 'react';
import axios from 'axios';
import { BsCartPlus } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { SingleProductProps } from "@/types";

export default function Product({ product }: SingleProductProps) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [productData, setProductData] = useState<typeof product | null>(null);

//   const { favorites,removeFavorite,addFavorite } = useFavoritesStore();
//   const isFavorite = favorites.some((fav) => fav.productId === product.id);
//   const [isPress, setisPress] = useState<boolean>(isFavorite);
  
  
  const handleToggleFavorite = () => {
    //   if (isFavorite) {
    //        removeFavorite(product.id);
    //        setisPress(false)
    //   } else {
    //       addFavorite(product.id);
    //       setisPress(true)
    //   }
    //   console.log(favorites)
  };
  
  return (
    <>
      <Link 
        href={`${window.location.pathname}/${product.id}`} 
        className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl block"
      >
        {/* Product Image */}
        <div className="relative group">
          <img 
            src={product.image || "/api/placeholder/300/300"} 
            alt={product.name}
            className="w-full h-64 object-cover group-hover:opacity-95 transition-opacity"
          />
          {/* Floating Buttons */}
          <div 
            onClick={(e) => e.preventDefault()} 
            className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <button 
              className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Add to wishlist"
              onClick={handleToggleFavorite}
            >
              <IoHeartOutline className="w-5 h-5 text-gray-600 dark:text-gray-200" />
            </button>
            {/* <button 
              className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Add to cart"
            >
              <BsCartPlus className="w-5 h-5 text-gray-600 dark:text-gray-200" />
            </button> */}
          </div>
          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 font-medium text-sm"
          >
            Quick View
          </button>
        </div>

        {/* Product Content */}
        <div className="p-5">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {product.price}
            </span>
          </div>
        </div>
      </Link>

      {/* Quick View Modal with Full Product Page Content */}
      {showQuickView && productData && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowQuickView(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQuickView(false)}
              className="absolute right-4 top-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-50"
            >
              <IoClose className="w-5 h-5 text-gray-600 dark:text-gray-200" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              <img 
                src={productData.image || "/api/placeholder/300/300"} 
                alt={productData.name} 
                className="w-full h-64 object-cover mb-6"
              />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{productData.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4">
                {productData.description}
              </p>
              <span className="text-xl font-bold text-gray-900 dark:text-white">{productData.price}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
