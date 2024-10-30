"use client"
import { BsCartPlus } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";

interface ProductProps {
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        subCategoryId :string;
    };
}

export default function Product({ product }: ProductProps) {
    // const router = useRouter()   

    // const handleClick = () => {
    //     router.push(`${product.id}`)
    // };
    
    return (
        <>
           
                <Link
                href={`${product.subCategoryId}/${product.id}`}
                    // onClick={handleClick}
                    className="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative">
                    <div className="flex space-x-2 absolute top-3 right-3">
                        <div
                            className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
                            <IoHeartOutline className="text-black  text-[24px]" />
                        </div>
                        <div
                            className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
                            <BsCartPlus className="text-black text-[24px]" />
                        </div>
                    </div>
                    <div className="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                        <img src={product.imageUrl} alt="Product 1"
                            className="h-full w-full object-contain" />
                    </div>

                    <div className="p-6 bg-white">
                        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                        <h4 className="text-lg text-gray-800 font-bold mt-2">{product.price}</h4>
                        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                    </div>

                </Link>
            
        </>
    )

}
