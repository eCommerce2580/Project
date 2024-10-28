import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { id, orderDate, totalAmount, paymentMethodId, shippingAddressId, userId, expectedDeliveryDate, orderItems } = await request.json();

        // יצירת הזמנה עם כל השדות הנדרשים
        const order = await prisma.orders.create({
            data: {
                orderDate: orderDate ? new Date(orderDate) : new Date(),
                totalAmount,
                paymentMethod: { connect: { id: paymentMethodId } },
                shippingAddress: { connect: { id: shippingAddressId } },
                expectedDeliveryDate: expectedDeliveryDate ? new Date(expectedDeliveryDate) : undefined,
                user: { connect: { id: userId } },
                status: { connect: { id: id } },  // בהנחה ש-id מתייחס לסטטוס ההזמנה

                // יצירת פריטי הזמנה
                orderItems: {
                    create: orderItems.map((item: { productId: string; quantity: number; price: number }) => ({
                        product: { connect: { id: item.productId } },
                        quantity: item.quantity,
                        price: item.price,
                    }))
                }
            }
        });

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

        // בדיקה שהשדות הדרושים קיימים
        if (!orderId || !statusId) {
            return NextResponse.json({ message: "Missing orderId or statusId", success: false }, { status: 400 });
        }

        // עדכון הסטטוס בלבד
        const updatedOrder = await prisma.orders.update({
            where: { id: orderId },
            data: {
                status: { connect: { id: statusId } }
            }
        });

        console.log("Order status updated successfully:", updatedOrder);
        return NextResponse.json({ message: "Order status updated successfully", success: true, order: updatedOrder });
    } catch (error) {
        console.error("Error updating order status:", error);
        return NextResponse.json({ message: "Failed to update order status", success: false }, { status: 500 });
    }
}