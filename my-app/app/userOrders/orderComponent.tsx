import { ProductInOrder } from "./productInOrderComponent";

type OrderComponentProps= {
    order: {
        paymentMethod: {
            name: string;
        };
        status: {
            name: string;
        };
        orderItems: {
            id: string;
            orderId: string;
            productId: string;
            quantity: number;
            price: number;
            product: {
                name: string;
                price: number;
            };
        }[];
        id: string;
        orderDate: Date;
        totalAmount: number;
        paymentMethodId: string;
        shippingAddressId: string;
        expectedDeliveryDate: Date ;
        userId: string;
        statusId: string;
       
    }
};

export function OrderComponent({ order }: OrderComponentProps) {
    return (
        <div className="mt-7 border border-gray-300 pt-9">
            <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                <div className="data">
                    <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">Order : #{order.id}</p>
                    <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                        Order Payment : {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center gap-3 max-md:mt-5">
                    <button className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">
                        Show Invoice
                    </button>
                    <button className="rounded-full px-7 py-3 bg-indigo-600 shadow-sm text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700">
                        Buy Now
                    </button>
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
                    <p className="font-medium text-xl leading-8 text-black max-sm:py-4">
                        <span className="text-gray-500"> Total Price: </span>&nbsp;${order.totalAmount.toFixed(2)}
                    </p>
                </div>
                <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
                    <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">Status</p>
                        <p className="font-semibold text-lg leading-8 text-green-500 text-left whitespace-nowrap">{order.status.name}</p>
                    </div>
                    <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">Delivery Expected by</p>
                        <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">{new Date(order.expectedDeliveryDate).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};