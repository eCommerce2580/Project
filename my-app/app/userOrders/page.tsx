import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/options";
import { OrderComponent } from "./orderComponent";

async function getUserOrders(id: string) {
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
                orderProducts: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                price: true,
                                image: true,
                                colors: {
                                    include: {
                                        color: {
                                            select: {
                                                name: true,
                                            },
                                        },
                                    },
                                },
                                sizes: {
                                    include: {
                                        size: {
                                            select: {
                                                label: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        // const order=
        console.log(orders[0].orderProducts[0].product.colors)
        console.log(orders[0].orderProducts[0].product.sizes)
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

                    {orders.map((order) => <OrderComponent key={order.id} order={order} />)}
                </div>
            </section>
        </div>
    );
}




