import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/options";
import { OrderComponent } from "./orderComponent";

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
                                price: true,
                                image:true,
                            },
                        },
                    },
                },
            },
        });
        console.log(orders[0].orderItems);
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}


export default async function UserOrders() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return <div>no orders</div>
    }
    // @ts-ignore
    const orders = await getUserOrders(session?.user.id)
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
                    {/* {orders.map((order) => <OrderComponent />)} */}

                    {orders.map((order) => <OrderComponent order={order} />)}
                </div>
            </section>
        </div>
    );
}



// function OrderComponent(order: Order) {
//     return (
//         <div className="mt-7 border border-gray-300 pt-9">
//             <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
//                 <div className="data">
//                     <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">Order : #123</p>
//                     <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">Order Payment : 18th March 2021</p>
//                 </div>
//                 <div className="flex items-center gap-3 max-md:mt-5">
//                     <button className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">Show Invoice</button>
//                     <button className="rounded-full px-7 py-3 bg-indigo-600 shadow-sm text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700">Buy Now</button>
//                 </div>
//             </div>
//             <ProductInOrder />
//             <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
//                 <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
//                     <div className="flex max-sm:flex-col-reverse items-center">
//                         <button className="flex items-center gap-3 py-10 pr-8 sm:border-r border-gray-300 font-normal text-xl leading-8 text-gray-500 group transition-all duration-500 hover:text-indigo-600">
//                             <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path className="stroke-gray-600 transition-all duration-500 group-hover:stroke-indigo-600" d="M14.0261 14.7259L25.5755 26.2753M14.0261 26.2753L25.5755 14.7259" stroke="" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                             Cancel Order
//                         </button>
//                         <p className="font-normal text-xl leading-8 text-gray-500 sm:pl-8">Payment Is Successful </p>
//                     </div>
//                     <p className="font-medium text-xl leading-8 text-black max-sm:py-4"><span className="text-gray-500"> Total Price: </span>&nbsp;$200.00</p>
//                 </div>
//             </div>
//         </div>
//     );
// }


