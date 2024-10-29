import { CancelOrderButton } from "./CancelOrderButton";
import { ProductInOrder } from "./productInOrderComponent";

type OrderComponentProps = {
    order: {
        paymentMethod: { name: string };
        status: { name: string };
        orderItems: {
            id: string;
            orderId: string;
            productId: string;
            quantity: number;
            price: number;
            product: { name: string; price: number, image:string };
        }[];
        id: string;
        orderDate: Date;
        totalAmount: number;
        paymentMethodId: string;
        shippingAddressId: string;
        expectedDeliveryDate: Date;
        userId: string;
        statusId: string;
    };
};

    export function OrderComponent({ order }: OrderComponentProps) {
        return (
            <div className="mt-7 border border-gray-300 pt-9 pb-4"> {/* הוספת padding-bottom */}
                <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                    <div className="data">
                        <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                            Order Payment : {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                        <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">
                            Total Amount : ${order.totalAmount}
                        </p>
                    </div>
                    <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
                        <div className="flex flex-col justify-center items-start max-sm:items-center">
                            <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                Delivery Expected by
                            </p>
                            <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                                {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                            </p>
                        </div>
                        <CancelOrderButton orderId={order.id} statusId={order.statusId} statusName={order.status.name} />
                    </div>
                </div>
    
                {order.orderItems.map((item) => (
                    <ProductInOrder key={item.id} product={item} />
                ))}
            </div>
        );
    }
    
