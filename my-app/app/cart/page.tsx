"use client"
import React from 'react';
import { useCartStore } from '@/providers/cartStore';
import Link from 'next/link';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        if (newQuantity >= 1) {
            updateQuantity(itemId, newQuantity);
        }
    };

    return (
        <section>
            {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-screen py-20">
                    <MdOutlineRemoveShoppingCart className="text-8xl text-blue-500 dark:text-blue-400" />
                    <h3 className="font-normal text-lg leading-8 text-gray-600 dark:text-gray-400 mt-4">Your cart is empty.</h3>
                    <Link href="/" className="mt-2 text-indigo-600 dark:text-indigo-400 hover:underline">Continue Shopping</Link>
                </div>
            ) : (
                <>
                    <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                                <div className="flex items-center justify-between pb-8 border-b border-gray-300 dark:border-gray-700">
                                    <h2 className="font-manrope font-bold text-3xl leading-10 text-black dark:text-gray-200">Shopping Cart</h2>
                                    <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600 dark:text-gray-400">{cart.reduce((total, item) => total + item.quantity, 0)} Items</h2>
                                </div>
                                
                                {cart.map((item, index) => (
                                    <div key={`${item.id}-${index}`} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 dark:border-gray-700 group">
                                        <div className="w-full md:max-w-[126px]">
                                            <img src={item.image} alt={item.name} className="mx-auto rounded-xl object-cover" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                            <div className="md:col-span-2">
                                                <div className="flex flex-col max-[500px]:items-center gap-3">
                                                    <h6 className="font-semibold text-base leading-7 text-black dark:text-gray-200">{item.name}</h6>
                                                    <h6 className="font-normal text-base leading-7 text-gray-500 dark:text-gray-400">{item?.description}</h6>
                                                    <h6 className="font-normal text-base leading-7 text-gray-500 dark:text-gray-400">{item?.size}</h6>
                                                    <h6 className="font-normal text-base leading-7 text-gray-500 dark:text-gray-400">{item?.color}</h6>
                                                    <h6 className="font-medium text-base leading-7 text-gray-600 dark:text-gray-400 transition-all duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">${item.price.toFixed(2)}</h6>
                                                </div>
                                            </div>
                                            <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                                                <div className="flex items-center h-full">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.uniqueId || item.id, item.quantity - 1)}
                                                        className="group rounded-l-xl px-5 py-[18px] border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm transition-all duration-500 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.uniqueId || item.id, parseInt(e.target.value) || 1)}
                                                        className="border-y border-gray-200 dark:border-gray-700 outline-none text-gray-900 dark:text-gray-200 font-semibold text-lg w-full max-w-[73px] min-w-[60px] text-center bg-transparent"
                                                    />
                                                    <button
                                                        onClick={() => handleQuantityChange(item.uniqueId || item.id, item.quantity + 1)}
                                                        className="group rounded-r-xl px-5 py-[18px] border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm transition-all duration-500 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                                <button 
                                                    onClick={() => removeFromCart(item.uniqueId || item.id)}
                                                    className="ml-4 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-all duration-300"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                                <div className="flex items-center justify-between mt-8">
                                    <button
                                        onClick={clearCart}
                                        className="flex items-center px-5 py-3 rounded-full gap-2 bg-red-500 dark:bg-red-600 text-white font-semibold text-lg transition-all duration-500 hover:bg-red-600 dark:hover:bg-red-500"
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>

                            <div className="col-span-12 xl:col-span-4 bg-gray-50 dark:bg-gray-800 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                                <h2 className="font-manrope font-bold text-3xl leading-10 text-black dark:text-gray-200 pb-8 border-b border-gray-300 dark:border-gray-700">Order Summary</h2>
                                <div className="mt-8">
                                    <div className="flex items-center justify-between pb-6">
                                        <p className="font-normal text-lg leading-8 text-black dark:text-gray-200">{cart.length} Items</p>
                                        <p className="font-medium text-lg leading-8 text-black dark:text-gray-200">${calculateTotal().toFixed(2)}</p>
                                    </div>
                                    <button className="w-full text-center bg-indigo-600 dark:bg-indigo-500 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700 dark:hover:bg-indigo-600">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default Cart;