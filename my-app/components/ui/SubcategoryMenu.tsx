
"use client"

function SubcategoryMenu({ subcategories }: { subcategories: { name: string; category: string; items: string[] }[] }) {
    return (
        <>
            <div className="flex gap-4">
                <div className="mb-2 text-sm font-medium">
                    <ul className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">

                        {subcategories.map((subcategory, index) => (
                            <li key={index} className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                                <a href={`/products/${subcategory}`} className="text-black dark:text-white block">
                                    {subcategory.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );

}

export default SubcategoryMenu;