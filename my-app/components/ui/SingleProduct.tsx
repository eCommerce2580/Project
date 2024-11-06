"use client"
import React, { useState } from 'react';
import { useCartStore } from '@/providers/cartStore';
import { ShoppingCart } from './ShoppingCart';
import { SingleProductProps, CartItem } from '@/types';
import { ToastContainer, toast } from 'react-toast'
import { useUserStore } from '@/providers/userStore';
import { useRouter } from "next/navigation";



function SingleProduct({ product }: SingleProductProps) {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const addToCart = useCartStore((state) => state.addToCart);
    const router=useRouter();

    const { user } = useUserStore();
    const handleAddToCart = () => {
        if (!user) {
            toast("you need to log in");
            return;
        }
        if (product.sizes.length === 0 && product.colors.length === 0) {
            addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image });
        } else {
            if (!selectedColor || !selectedSize) {
                toast("you need to choose color and size");
                return;
            }
            const uniqueId = `${product.id}-${selectedColor}-${selectedSize}`; // מזהה ייחודי לפי מזהה מוצר, צבע ומידה

            addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image, size: selectedSize, color: selectedColor, uniqueId });
        }

        setIsCartVisible(true); 

        setTimeout(() => setIsCartVisible(false), 3000);
    };

    const handleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    return (
        <div>

            <div className="font-sans bg-white dark:bg-gray-900">
                <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
                    <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700">
                        <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                            <div className="px-4 py-10 rounded-lg relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-3/4 rounded object-cover mx-auto"
                                />
                                <button type="button" className="absolute top-4 right-4" onClick={handleFavorite}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20px"
                                        fill="#ccc"
                                        className="mr-1 hover:fill-[#333]"
                                        viewBox="0 0 64 64"
                                    >
                                        <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86A18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200">{product.name}</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">{product.description}</p>

                            <div className="flex space-x-2 mt-4">
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <p className="text-gray-800 dark:text-gray-200 text-3xl font-bold">${product.price}</p>
                                <p className="text-gray-400 dark:text-gray-500 text-base">
                                    <span className="text-sm ml-1">Tax included</span>
                                </p>
                            </div>

                            {/* Sizes section */}
                            {product.sizes.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Sizes</h3>
                                    <div className="flex flex-wrap gap-4 mt-4">
                                        {product.sizes.map((size, index) => (
                                            <button
                                                key={`${size.id}-${index}`}
                                                type="button"
                                                className={`w-10 h-10 border-2 font-semibold text-sm rounded-full flex items-center justify-center shrink-0 ${selectedSize === size.size.label ? 'border-blue-600 dark:border-blue-400' : 'border-gray-300 dark:border-gray-600'}`}
                                                onClick={() => setSelectedSize(size.size.label)}
                                            >
                                                {size.size.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Colors section */}
                            {product.colors.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Choose a Color</h3>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {product.colors.map((color, index) => (
                                            <button
                                                key={`${color.id}-${index}`}
                                                type="button"
                                                className={`w-10 h-10 rounded-full shrink-0 transition-all ${selectedColor === color.color.name ? 'ring-2 ring-gray-800 dark:ring-gray-200' : ''}`}
                                                style={{ backgroundColor: color.color.hexCode || color.color.name}} // כאן השתמש ב-hexCode
                                                onClick={() => setSelectedColor(color.color.name)}
                                            ></button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-4 mt-8">
                                {/* <button onClick={() => router.push("/checkout")}  type="button" className="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded bg-gradient-to-r from-orange-500 via-purple-500 to-blue-400
hover:from-orange-400 hover:via-purple-400 hover:to-blue-300
">Buy now</button>                              */}
  <button onClick={handleAddToCart} type="button" className="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded bg-gradient-to-r from-orange-500 via-purple-500 to-blue-400
hover:from-orange-400 hover:via-purple-400 hover:to-blue-300
">Add to cart</button> 
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                isCartVisible && (
                    <div key="shopping-cart-popup" className="fixed bottom-4 right-4 p-4 bg-white dark:bg-gray-700 shadow-lg dark:shadow-gray-600 rounded-lg">
                        <ShoppingCart />
                    </div>
                )
            }
        </div >
    );
}

export default SingleProduct;