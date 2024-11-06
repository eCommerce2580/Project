'use client';

import { useUserStore } from '@/providers/userStore';
import { useDeliveryDetailsStore } from '@/providers/deliveryDetailsStrore';
import React, { useState } from 'react';
import AddressDetails from './AddressDetails';

export default function DeliveryDetails() {
  const { fetchUser, user } = useUserStore();
  const { deliveryDetails, setDeliveryDetails } = useDeliveryDetailsStore();
  
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    phone: '',
    isComplited: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const gotopayment = (e: React.FormEvent) => {
    console.log("user", user)
    e.preventDefault();
//     console.log(formData);
//     const isAddressComplete =
//     user?.address?.city &&
//     user?.address?.country &&
//     user?.address?.houseNumber &&
//     user?.address?.street &&
//     user?.address?.zipCode;
// if(isAddressComplete)
// alert("plese fhinish to edit your adress");
 setDeliveryDetails({
    ...deliveryDetails,
  phoneNumber: formData.phone,
   email: formData.email|| "",
   name: formData.name||"",
   userId: user?.id ?? null,
   isComplited: true
 });
 
  };

  return (
    <form className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Order Confirmation Details</h2>
        
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="block w-full max-w-xs rounded-lg border p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
            placeholder={user?.name}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="block w-full max-w-xs rounded-lg border p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
            placeholder={user?.email}
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="block w-full max-w-xs rounded-lg border p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
            placeholder="123-456-7890"
            required
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Address Details</h2>
        <AddressDetails />

        <div className="sm:col-span-2">
          <button
          //  type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg border bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
   onClick={gotopayment}
        >
            pay
          </button>
        </div>
      </div>
    </form>
  );
}


// 'use client';

// import { useUserStore } from '@/providers/userStore';
// import { useDeliveryDetailsStore } from '@/providers/deliveryDetailsStrore'; // ייבוא של האחסון הגלובלי שלך
// import React, { useState } from 'react';
// import AddressDetails from './AddressDetails';

// export default  function DeliveryDetails() {
//   const { fetchUser, user } = useUserStore();
//   const { setDeliveryDetails } = useDeliveryDetailsStore(); // פונקציה לקביעת פרטי המשלוח
//   const address = user?.address;
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     isComplited: false
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(formData); // הדפסת הנתונים של הטופס

//     // עדכון האובייקט הגלובלי
//     setDeliveryDetails({
//       userId: user?.id || '', // הנחת ה-userId מה-store של המשתמש
//       phoneNumber: formData.phone,
//       email: formData.email,
//       name: formData.name, // הוספת השם לאובייקט הגלובלי
//       isComplited:formData.isComplited
//     });

//     // אפשר להוסיף כאן לוגיקה לשליחה לשרת
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
//       <div className="min-w-0 flex-1 space-y-8">
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Details</h2>

//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div>
//               <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your name</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="block w-full rounded-lg border p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
//                 placeholder="Bonnie Green"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="block w-full rounded-lg border p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
//                 placeholder="name@flowbite.com"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
//               <input
//                 type="text"
//                 id="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 className="block w-full rounded-lg border p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
//                 placeholder="123-456-7890"
//                 required
//               />
//             </div>

           
//             <AddressDetails/>
//             <div className="sm:col-span-2">
//               <button
//                 type="submit"
//                 className="flex w-full items-center justify-center gap-2 rounded-lg border bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
//               >
//                 Submit
//               </button>
//             </div>
            
//           </div>
//         </div>
     
//       </div>
//     </form>
//   );
// }




