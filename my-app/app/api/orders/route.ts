import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { id, orderDate, totalAmount, paymentMethodId, shippingAddressId, userId, expectedDeliveryDate, orderItems } = await request.json();

        // Check stock for each item in the order
        for (const item of orderItems) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
            });

            if (!product) {
                return NextResponse.json({ message: `Product ${item.productId} not found`, success: false }, { status: 404 });
            }

            if (product.amount < item.quantity) {
                return NextResponse.json({ message: `Product ${product.name} is out of stock`, success: false }, { status: 400 });
            }
        }

        // Create the order and update stock
        const order = await prisma.orders.create({
            data: {
                orderDate: orderDate ? new Date(orderDate) : new Date(),
                totalAmount,
                paymentMethod: { connect: { id: paymentMethodId } },
                shippingAddress: { connect: { id: shippingAddressId } },
                expectedDeliveryDate: expectedDeliveryDate ? new Date(expectedDeliveryDate) : undefined,
                user: { connect: { id: userId } },
                status: { connect: { id: id } },

                // Create order items and adjust stock
                orderItems: {
                    create: orderItems.map((item: { productId: string; quantity: number; price: number }) => ({
                        product: { connect: { id: item.productId } },
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
        });

        // Decrease product amounts in stock
        for (const item of orderItems) {
            await prisma.product.update({
                where: { id: item.productId },
                data: { amount: { decrement: item.quantity } },
            });
        }

        console.log("Order created successfully:", order);
        return NextResponse.json({ message: "Order created successfully", success: true, order });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ message: "Failed to create order", success: false }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { orderId, statusId } = await request.json();

        if (!orderId || !statusId) {
            return NextResponse.json({ message: "Missing orderId or statusId", success: false }, { status: 400 });
        }

        // Fetch the current order and its items
        const order = await prisma.orders.findUnique({
            where: { id: orderId },
            include: { orderItems: true },
        });

        if (!order) {
            return NextResponse.json({ message: "Order not found", success: false }, { status: 404 });
        }

        // Check if the status is being updated to 'cancelled'
        if (statusId === "2") {  // assuming '2' is the ID for 'cancelled'
            for (const item of order.orderItems) {
                await prisma.product.update({
                    where: { id: item.productId },
                    data: { amount: { increment: item.quantity } },
                });
            }
        }

        // Update only the order status
        const updatedOrder = await prisma.orders.update({
            where: { id: orderId },
            data: {
                status: { connect: { id: statusId } },
            },
        });

        console.log("Order status updated successfully:", updatedOrder);
        return NextResponse.json({ message: "Order status updated successfully", success: true, order: updatedOrder });
    } catch (error) {
        console.error("Error updating order status:", error);
        return NextResponse.json({ message: "Failed to update order status", success: false }, { status: 500 });
    }
}
