import prisma from "@/prisma/client";
import { Order } from "../store/types";
import {getServerSession} from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/options";

async function getUserOrders(id: any) {
    try {
        const orders = await prisma.orders.findMany({
            where: {  
userId: id,
            },
            include: {
                paymentMethod: {
                    select: {
                        name: true, 
                    },
                },
                status: {
                    select: {
                        name: true, 
                    },
                },
                orderItems: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                price:true
                            },
                        },
                    },
                },
            },
        });
        console.log("jfvbldkb",id)
        console.log(orders);
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error; // רשות להשליך את השגיאה למעלה
    }
}

export default async function UserOrders() {
    // const user = useSelector((state: any) => state.user);
    const session= await getServerSession(authOptions)
    if(!session)
    {
        return <div>no orders</div>
    }
    //@ts-ignore
    const orders =await getUserOrders(session?.user.id)
  
    return (
        <div>
            <section className="py-24 relative">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                    <h2 className="font-manrope font-extrabold text-3xl leading-10 text-black mb-9">Orders History</h2>
                    <div className="flex sm:flex-col lg:flex-row sm:items-center justify-between">
                        <ul className="flex max-sm:flex-col sm:items-center gap-x-14 gap-y-3">
                            <li className="font-medium text-lg leading-8 cursor-pointer text-indigo-600 transition-all duration-500 hover:text-indigo-600">All Orders</li>
                            <li className="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">Summary</li>
                            <li className="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">Completed</li>
                            <li className="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">Cancelled</li>
                        </ul>
                    </div>
                    {/* {orders.map((order:Order) => (<OrderComponent order={order} />))} */}
                    {orders.length > 0 ? <OrderComponent /> : <div>no orders</div>}  
                </div>
            </section>
        </div>
    );
    
  
}

// function OrderComponent(order: Order) {
    function OrderComponent() {
    return (
        <div className="mt-7 border border-gray-300 pt-9">
            <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                <div className="data">
                    <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">Order : #123</p>
                    <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">Order Payment : 18th March 2021</p>
                </div>
                <div className="flex items-center gap-3 max-md:mt-5">
                    <button className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">Show Invoice</button>
                    <button className="rounded-full px-7 py-3 bg-indigo-600 shadow-sm text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700">Buy Now</button>
                </div>
            </div>
            <ProductInOrder />
            <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
                    <div className="flex max-sm:flex-col-reverse items-center">
                        <button className="flex items-center gap-3 py-10 pr-8 sm:border-r border-gray-300 font-normal text-xl leading-8 text-gray-500 group transition-all duration-500 hover:text-indigo-600">
                            <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="stroke-gray-600 transition-all duration-500 group-hover:stroke-indigo-600" d="M14.0261 14.7259L25.5755 26.2753M14.0261 26.2753L25.5755 14.7259" stroke="" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Cancel Order
                        </button>
                        <p className="font-normal text-xl leading-8 text-gray-500 sm:pl-8">Payment Is Successful </p>
                    </div>
                    <p className="font-medium text-xl leading-8 text-black max-sm:py-4"><span className="text-gray-500"> Total Price: </span>&nbsp;$200.00</p>
                </div>
            </div>
        </div>
    );
}

function ProductInOrder() {
    return (
        <div>
            <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
                <path d="M0 1H1216" stroke="#D1D5DB" />
            </svg>
            <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                <div className="grid grid-cols-4 w-full">
                    <div className="col-span-4 sm:col-span-1">
                        <img src="https://pagedone.io/asset/uploads/1705474774.png" alt="" className="max-sm:mx-auto object-cover" />
                    </div>
                    <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                        <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">Decoration Flower Pot</h6>
                        <p className="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap">By: Dust Studios</p>
                        <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                            <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Size: s</span>
                            <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Qty: 1</span>
                            <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">Price $80.00</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
                    <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">Status</p>
                        <p className="font-semibold text-lg leading-8 text-green-500 text-left whitespace-nowrap">Delivered</p>
                    </div>
                    <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">Delivery Expected by</p>
                        <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">23rd March 2021</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
