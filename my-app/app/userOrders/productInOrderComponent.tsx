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
    return (
        <div>
            <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2" fill="none">
                <path d="M0 1H1216" stroke="#D1D5DB" />
            </svg>
            <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                <div className="grid grid-cols-4 w-full">
                    <div className="col-span-4 sm:col-span-1">
                        <img src={product.product.image} alt="" className="max-sm:mx-auto object-cover" />
                    </div>
                    <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                        <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">{product.product.name}</h6>
                        <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                            <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Size: {product.product.sizes[0].size.label}</span>
                            <div className="flex items-center"> {/* Use flex here for alignment */}
                                <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap mr-1">Color:</span> {/* Adjusted margin */}
                                <button
                                    type="button"
                                    className="w-6 h-6 rounded-full shrink-0 transition-all border-2 border-white"
                                    style={{ backgroundColor: product.product.colors[0].color.name }}
                                    disabled
                                ></button>
                            </div>
                            <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Qty: {product.quantity}</span>
                            <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">Price: ${product.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

