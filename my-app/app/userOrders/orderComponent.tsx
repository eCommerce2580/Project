import { StatusOfOrder } from "./StatusOfOrder";
import { ProductInOrder } from "./productInOrderComponent";

export type OrderComponentProps = {
    order: {
        status: { name: string };
        orderProducts: {
            id: string;
            orderId: string;
            productId: string;
            quantity: number;
            price: number;
            product: {
                name: string;
                price: number;
                image: string;
                colors: {
                    color: { name: string; hexCode?: string | null };
                }[];
                sizes: {
                    size: { label: string };
                }[];
            };
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
        <div className="mt-7 border border-gray-300 dark:border-gray-700 pt-9 pb-4 bg-white dark:bg-gray-800 rounded-lg">
            {/* Order Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-3 md:px-11 mb-8">

                {/* Order Date Section */}
                <div className="flex flex-col space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Order Payment
                    </h3>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                </div>

                {/* Total Amount Section */}
                <div className="flex flex-col space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Total Amount
                    </h3>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        ${order.totalAmount}
                    </p>
                </div>



                {/* Delivery Date Section */}
                <div className="flex flex-col space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Delivery Expected by
                    </h3>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                    </p>
                </div>

                {/* Status Section */}
                <div className="flex flex-col space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Order Status
                    </h3>
                    <div className="flex items-center gap-4">
                        <StatusOfOrder orderId={order.id} statusName={order.status.name} />
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-6"></div>

            {/* Products List */}
            <div className="px-3 md:px-11">
                {order.orderProducts.map((product) => (
                    <ProductInOrder key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}