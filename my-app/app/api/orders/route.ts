import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { orderDate, totalAmount, paymentMethodId, shippingAddressId, userId, expectedDeliveryDate, orderItems, statusId } = await request.json();

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
                expectedDeliveryDate: new Date(expectedDeliveryDate),
                user: { connect: { id: userId } },
                status: { connect: { id: statusId } },

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
        const { orderId, statusName } = await request.json();

        if (!orderId || !statusName) {
            return NextResponse.json({ message: "Missing orderId or statusName", success: false }, { status: 400 });
        }

        // מציאת מזהה הסטטוס לפי השם
        const status = await prisma.ordersStatus.findFirst({
            where: { name: statusName }
        });
        
        if (!status) {
            return NextResponse.json({ message: "Status not found", success: false }, { status: 404 });
        }

        // שליפת ההזמנה עם פרטי הפריטים שבה
        const order = await prisma.orders.findUnique({
            where: { id: orderId },
            include: { orderItems: true },
        });

        if (!order) {
            return NextResponse.json({ message: "Order not found", success: false }, { status: 404 });
        }

        // בדיקת מעבר לסטטוס 'Cancelled' ועדכון המלאי בהתאם
        if (statusName === "Cancelled") {
            for (const item of order.orderItems) {
                await prisma.product.update({
                    where: { id: item.productId },
                    data: { amount: { increment: item.quantity } },
                });
            }
        }

        // עדכון הסטטוס של ההזמנה למזהה המתאים
        const updatedOrder = await prisma.orders.update({
            where: { id: orderId },
            data: {
                status: { connect: { id: status.id } },
            },
        });

        console.log("Order status updated successfully:", updatedOrder);
        return NextResponse.json({ message: "Order status updated successfully", success: true, order: updatedOrder });
    } catch (error) {
        console.error("Error updating order status:", error);
        return NextResponse.json({ message: "Failed to update order status", success: false }, { status: 500 });
    }
}
