import Link from "next/link";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/options";


export default async function Favorites() {
    const session: any = await getServerSession(authOptions); // הגדרת session כ-any כדי לעקוף את ההערות של TypeScript
    const userId = session?.user?.id
   console.log(userId)
    const favorites:any = await prisma.favorites.findFirst({
        where: { userId: userId },
      });
    if (favorites.length === 0) {
        return (
            <div className="text-center p-10">
                <h2 className="text-2xl font-bold">אין מועדפים להצגה</h2>
                <p className="text-gray-500 mt-2">התחילו להוסיף מוצרים למועדפים כדי לראות אותם כאן.</p>
            </div>
        );
    }

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favProduct:any) => (
                <div key={favProduct.productId} className="bg-gray-50 shadow-md overflow-hidden rounded-lg relative">
                    <div className="flex space-x-2 absolute top-3 right-3">
                        <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
                            {/* <button
                                type="button"
                                onClick={() => removeFavorite(favProduct.productId)}
                            >
                                <IoHeart className="text-red-500 text-[24px]" />
                            </button> */}
                        </div>
                    </div>
                     <Link href={`/product/${favProduct.productId}`} className="w-full h-full">
                        <div className="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                            <img src={favProduct.image} alt={favProduct.name} className="h-full w-full object-contain" />
                        </div>

                        <div className="p-6 bg-white">
                            <h3 className="text-lg font-bold text-gray-800">{favProduct.name}</h3>
                            <h4 className="text-lg text-gray-800 font-bold mt-2">{favProduct.price}</h4>
                            <p className="text-gray-600 text-sm mt-2">{favProduct.description}</p>
                        </div>
                    </Link> 
               </div>
            ))} 
        </div>
    );
}