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
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

export default async function UserOrders() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return <div className="text-gray-800 dark:text-white">no orders</div>
    }
    // @ts-ignore
    const orders = await getUserOrders(session?.user.id)
    return (
        <div className="bg-white dark:bg-gray-900">
            <section className="py-24 relative">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                    <h2 className="font-manrope font-extrabold text-3xl leading-10 text-gray-800 dark:text-white mb-9">
                        Orders History
                    </h2>
                    {orders.map((order) => <OrderComponent key={order.id} order={order} />)}
                </div>
            </section>
        </div>
    );
}