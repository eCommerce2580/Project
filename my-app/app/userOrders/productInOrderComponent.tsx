export type ProductInOrderProps = {
    product: {
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
    };
};


export function ProductInOrder({ product }: ProductInOrderProps) {
    console.log(product)
    return (
        <div>
            <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
                <path d="M0 1H1216" stroke="#D1D5DB" className="dark:stroke-gray-700" />
            </svg>
            <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                <div className="grid grid-cols-4 w-full">
                    <div className="col-span-4 sm:col-span-1">
                        <img src={product.product.image} alt="" className="max-sm:mx-auto object-cover rounded-lg" />
                    </div>
                    <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                        <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-800 dark:text-white mb-3 whitespace-nowrap">
                            {product.product.name}
                        </h6>
                        <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                        {product.product.sizes.length !== 0 &&    <span className="font-normal text-lg leading-8 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                Size: {product.product.sizes[0].size.label}
                            </span>}
                            {product.product.colors.length !== 0 && <div className="flex items-center">
                                <span className="font-normal text-lg leading-8 text-gray-500 dark:text-gray-400 whitespace-nowrap mr-1">
                                    Color:
                                </span>
                                <div
                                    className="w-6 h-6 rounded-full shrink-0 transition-all border-2 border-white dark:border-gray-700"
                                    style={{ backgroundColor: product.product.colors[0].color.hexCode || product.product.colors[0].color.name }} // כאן השתמש ב-hexCode
                                ></div>
                            </div>}
                            <span className="font-normal text-lg leading-8 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                Qty: {product.quantity}
                            </span>
                            <p className="font-semibold text-xl leading-8 text-gray-800 dark:text-white whitespace-nowrap">
                                Price: {product.price} ₪
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
