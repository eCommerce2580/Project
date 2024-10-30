
"use client"
import Link from "next/link";

function SubcategoryMenu({ subcategories , categoryName}: { subcategories: {id:string; name: string; categoryId: string; items: string[] }[] ,categoryName: string}) {
  console.log(subcategories)
 
  return (
    <div className="flex gap-4">
      <div className="mb-2 text-sm font-medium">
        <ul className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {subcategories.map((subcategory, index) => {
            // const categoryIdAndSubId = {
            //     categoryId: subcategory.categoryId,
            //     subcategoryId:subcategory.id 
            //   };
            return (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <Link href={`http://localhost:3000/products/${categoryName}/${subcategory.name}`} className="text-black dark:text-white block">
                  {subcategory.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}


export default SubcategoryMenu;