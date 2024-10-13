import React from 'react'
import Product from '../../../components/ui/Product';
import axios from "axios";


export default function Page({ category }: { category: string }) {
    const products = [
        {
          id: '1',
          name: 'Sole Elegance',
          description: '5 types of shoes available',
          price: 10.5,
          imageUrl: 'https://readymadeui.com/images/product9.webp',
          category: "2",
        },
        {
          id: '2',
          name: 'Urban Sneakers',
          description: '5 types of shoes available',
          price: 12.5,
          imageUrl: 'https://readymadeui.com/images/product10.webp',
          category: "2",
        },
        {
          id: '3',
          name: 'Velvet Boots',
          description: '5 types of shoes available',
          price: 14.5,
          imageUrl: 'https://readymadeui.com/images/product11.webp',
          category: "2",
        },
        {
          id: '4',
          name: 'Summit Hiking',
          description: '5 types of shoes available',
          price: 12.5,
          imageUrl: 'https://readymadeui.com/images/product12.webp',
          category: "1",
        },
      ];
    // async function getProduct() {
    //     try {
    //       const { data } = await axios.get(`${url}${id}`);
    //     } 
    //     catch (error) {
    //       console.log(error);
    //     }
    //   }
    // const product= getProduct();
      return (
        <>
          <div className="font-[sans-serif] py-4 mx-auto lg:max-w-7xl sm:max-w-full">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-12">Premium Sneakers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    
              {/* {product.map((produc, index) => (
                <Product key={produc.id} product={produc} />
              ))} */}
             
            </div>
          </div>
        </>
      )
}
