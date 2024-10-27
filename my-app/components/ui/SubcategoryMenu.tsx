
"use client"

function SubcategoryMenu({ subcategories }: { subcategories: string[] }) {

    return (
    <>
          
                <div className="flex gap-4">
                    <div>
                        <h3 className="mb-2 text-sm font-medium">Startup</h3>
                        <a href="#" className="mb-1 block text-sm text-neutral-400">Bookkeeping</a>
                        <a href="#" className="block text-sm text-neutral-400">Invoicing</a>
                    </div>
                    <div>
                        <h3 className="mb-2 text-sm font-medium">Scaleup</h3>
                        <a href="#" className="mb-1 block text-sm text-neutral-400">Live Coaching</a>
                        <a href="#" className="mb-1 block text-sm text-neutral-400">Reviews</a>
                        <a href="#" className="block text-sm text-neutral-400">Tax/VAT</a>
                    </div>
                    <div>
                        <h3 className="mb-2 text-sm font-medium">Enterprise</h3>
                        <a href="#" className="mb-1 block text-sm text-neutral-400">White glove</a>
                        <a href="#" className="mb-1 block text-sm text-neutral-400">SOX Compliance</a>
                        <a href="#" className="block text-sm text-neutral-400">Staffing</a>
                        <a href="#" className="block text-sm text-neutral-400">More</a>
                    </div>
                </div>
                {/* <ul className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">

                    {subcategories.map((subcategory, index) => (
                        <li key={index} className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                            <a href={`/products/${subcategory}`} className="text-black dark:text-white block">
                                {subcategory}
                            </a>
                        </li>
                    ))}
                </ul> */}
            </>
            );
  
}

            export default SubcategoryMenu;