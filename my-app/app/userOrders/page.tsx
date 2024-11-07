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
                status: {
                    select: {
                        name: true,
                        progressLevel:true
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
                                                hexCode:true
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
        console.log(orders)
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

export default async function UserOrders() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return <div className="text-gray-800 dark:text-white">You need to Log In</div>
    }
    // @ts-ignore
    const orders = await getUserOrders(session?.user.id)
    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
            <div className="flex-1 mt-20 mb-10">
                {orders.length === 0 ? (
                    <div className="text-center">
                        <h2 className="font-manrope font-extrabold text-2xl leading-10 text-gray-800 dark:text-white mb-9">
                            You haven't orders yet
                        </h2>
                    </div>
                ) : (
                    <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
                        <h2 className="font-manrope font-extrabold text-3xl leading-10 text-gray-800 dark:text-white mb-9">
                            Orders History
                        </h2>
                        {orders.map((order) => (
                            <OrderComponent key={order.id} order={order} />
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
}