'use client'

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
        <section className="min-h-screen bg-white dark:bg-gray-900">
            {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <MdOutlineRemoveShoppingCart className="text-8xl text-gray-400 dark:text-gray-500" />
                    <h3 className="font-normal text-lg text-gray-600 dark:text-gray-300 mt-4">Your cart is empty.</h3>
                    <Link href="/" className="mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Shopping Cart</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {cart.reduce((total, item) => total + item.quantity, 0)} Items
                                </p>
                            </div>

                            <div className="space-y-6">
                                {cart.map((item, index) => (
                                    <div key={`${item.id}-${index}`} className="flex gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        </div>

                                        <div className="flex flex-1 flex-col">
                                            <div className="flex justify-between">
                                                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">{item.name}</h3>
                                                <p className="text-base font-medium text-gray-900 dark:text-gray-100">${item.price.toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.size} • {item.color}</p>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.uniqueId || item.id, item.quantity - 1)}
                                                        className="px-3 py-1 text-gray-600 dark:text-gray-400"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.uniqueId || item.id, parseInt(e.target.value) || 1)}
                                                        className="w-12 text-center border-x border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100"
                                                    />
                                                    <button
                                                        onClick={() => handleQuantityChange(item.uniqueId || item.id, item.quantity + 1)}
                                                        className="px-3 py-1 text-gray-600 dark:text-gray-400"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => removeFromCart(item.uniqueId || item.id)}
                                                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={clearCart}
                                className="mt-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                            >
                                Clear Cart
                            </button>
                        </div>

                        <div className="lg:col-span-4">
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Order Summary</h2>
                                <div className="mt-6 flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                    <span className="text-gray-900 dark:text-gray-100">${calculateTotal().toFixed(2)}</span>
                                </div>
                                <button className="mt-6 w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Cart;