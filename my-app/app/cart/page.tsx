'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
// import { RootState } from '../store'; // ייבוא ה-RootState מה-store
// import { ShoppingCartIcon } from '@heroicons/react/outline'; // אייקון לעגלה ריקה מ-heroicons

const page: React.FC = () => {
    const cart = useSelector((state: any) => state.cart);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* <h1 className="text-3xl font-semibold mb-6">Your Shopping Cart</h1> */}

            {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-16">
                    <MdOutlineRemoveShoppingCart className="w-24 h-24 text-gray-400" />
                    <p className="text-lg text-gray-500 mt-4">Your cart is empty.</p>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg p-6">
                    {cart.items.map((item : any) => (
                        <div key={item.productId} className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                            </div>
                            <p className="text-xl font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}

                    <div className="flex justify-between items-center border-t pt-4 mt-4">
                        <p className="text-2xl font-semibold">Total: ${cart.items.reduce((total: any, item: any) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                        <div>
                            {/* <Link href="/checkout"> */}
                                <a className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">Go to Checkout</a>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8">
                {/* <Link href="/store"> */}
                    <a href="/" className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600">Continue Shopping</a>
                {/* </Link> */}
            </div>
        </div>
    );
};

export default page;
