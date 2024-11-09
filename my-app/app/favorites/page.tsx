// import Link from "next/link";
// import { useState } from "react";
// import { IoHeart } from "react-icons/io5";
// import prisma from "@/prisma/client";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]/options";
// import axios from "axios";

// export default async function Favorites() {
//     const session: any = await getServerSession(authOptions);
//     const userId = session?.user?.id;

//     // קבלת המועדפים של המשתמש
//     const favorites: any = await prisma.favorites.findMany({
//         where: { userId: userId },
//         include: {
//             product: true // טוען את פרטי המוצר עבור כל מועדף
//         }
//     });

//     if (!favorites || favorites.length === 0) {
//         return (
//             <div className="text-center p-10">
//                 <h2 className="text-2xl font-bold">אין מועדפים להצגה</h2>
//                 <p className="text-gray-500 mt-2">התחילו להוסיף מוצרים למועדפים כדי לראות אותם כאן.</p>
//             </div>
//         );
//     }

//     // פונקציה למחיקת מועדף
//     // const removeFavorite = async (productId: string) => {
//     //     try {
//     //         await axios.delete(`/api/deleteFavorites`, { 
//     //             params: { userId, productId }
//     //         });
//     //         // רענון עמוד המועדפים לאחר מחיקת מוצר
//     //         window.location.reload();
//     //     } catch (error) {
//     //         console.error("שגיאה במחיקת המועדף:", error);
//     //     }
//     // };

//     return (
//         <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {favorites.map((fav: any) => (
//                 <div key={fav.productId} className="bg-gray-50 shadow-md overflow-hidden rounded-lg relative">
//                     {/* כפתור לב למחיקת המועדף */}
//                     {/* <div className="absolute top-3 right-3">
//                         <button
//                             type="button"
//                             onClick={() => removeFavorite(fav.productId)}
//                             className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
//                         >
//                             <IoHeart className="text-red-500 text-[24px]" />
//                         </button>
//                     </div> */}

//                     {/* קישור למוצר */}
//                     {/* <Link href={`/product/${fav.productId}`} className="w-full h-full"> */}

//                         <div className="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
//                             <img src={fav.product.image} alt={fav.product.name} className="h-full w-full object-contain" />
//                         </div>

//                         <div className="p-6 bg-white">
//                             <h3 className="text-lg font-bold text-gray-800">{fav.product.name}</h3>
//                             <h4 className="text-lg text-gray-800 font-bold mt-2">{fav.product.price}₪</h4>
//                             <p className="text-gray-600 text-sm mt-2">{fav.product.description}</p>
//                         </div>
//                     {/* </Link> */}
//                 </div>
//             ))}  
//         </div>
//     );
// }














// pages/Favorites.tsx
// pages/Favorites.tsx
import Link from "next/link";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/options";
import FavoriteButton from "@/components/ui/FavoriteButton";

export default async function Favorites() {
    const session: any = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const favorites: any = await prisma.favorites.findMany({
        where: { userId: userId },
        include: {
            product: {
                include: {
                    category: true,         // משיכת פרטי הקטגוריה
                    subCategory: true       // משיכת פרטי תת-הקטגוריה
                }
            }
        }
    });

    if (!favorites || favorites.length === 0) {
        return (
            <div className="text-center p-10">
                <h2 className="text-2xl font-bold">אין מועדפים להצגה</h2>
                <p className="text-gray-500 mt-2">התחילו להוסיף מוצרים למועדפים כדי לראות אותם כאן.</p>
            </div>
        );
    }

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav: any) => {
                const categoryName = fav.product.category?.name || "קטגוריה"; // בדיקה אם קיים שם לקטגוריה
                const subCategoryName = fav.product.subCategory?.name || "תת-קטגוריה"; // בדיקה אם קיים שם לתת-הקטגוריה
                const productName = fav.product?.name;

                const productId = fav.product?.id;
                return (
                    <div key={fav.productId} className="bg-gray-50 shadow-md overflow-hidden rounded-lg relative">
                        <div className="absolute top-3 right-3">
                            <FavoriteButton userId={userId} productId={fav.productId} />
                        </div>

                        <Link href={`http://localhost:3000/products/${categoryName}/${subCategoryName}/${productId}`} className="w-full h-full">
                            <div className="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                                <img src={fav.product.image} alt={fav.product.name} className="h-full w-full object-contain" />
                            </div>

                            <div className="p-6 bg-white">
                                <h3 className="text-lg font-bold text-gray-800">{productName}</h3>
                                <h4 className="text-lg text-gray-800 font-bold mt-2">{fav.product.price}₪</h4>
                                <p className="text-gray-600 text-sm mt-2">{fav.product.description}</p>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
