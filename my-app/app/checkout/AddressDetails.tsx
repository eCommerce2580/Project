'use client';

import React, { useEffect, useState } from 'react';

import { useUserStore, UserAddress } from '@/providers/userStore';
import { FiEdit } from 'react-icons/fi'; // אייקון לעריכה (יש להתקין את react-icons במידת הצורך)
import axios from 'axios';

export default function AddressDetails() {
  const { user, setUser } = useUserStore();
  console.log(user)
  const [isEditing, setIsEditing] = useState(false);
  const [addressForm, setAddressForm] = useState<any>({//state for the inputs
    country: user?.address?.country || '',
    city: user?.address?.city || '',
    street: user?.address?.street || '',
    houseNumber: user?.address?.houseNumber || '',
    zipCode: user?.address?.zipCode || ''
  });
  const [originalAddress, setOriginalAddress] = useState<any>();//state for the original Adress
  useEffect(() => {
    if (!user) return;
    setAddressForm({
      country: user?.address?.country || '',
      city: user?.address?.city || '',
      street: user?.address?.street || '',
      houseNumber: user?.address?.houseNumber || '',
      zipCode: user?.address?.zipCode || ''
    })
  }, [user])


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAddressForm((prevForm: any) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalAddress(addressForm); // שמירת הכתובת המקורית לפני עריכה
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAddressForm(originalAddress); // החזרת הכתובת המקורית
  };

  const handleSave = async () => {
    // שמירת הכתובת בחנות ובשרת
    try {
      const updatedAddress = { ...addressForm };

      if (user) {
        setUser({
          ...user, address: updatedAddress,
        });
      }
      // setOriginalAddress(updatedAddress); // עדכון הכתובת המקורית
      await axios.put(`http://localhost:3000/api/updateUser/${user?.email}`, updatedAddress)
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update address:', error);
    }
  };

  return (
    <div className="address-details space-y-4">
     

      {/* <form className="space-y-4" > */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {['country', 'city', 'street', 'houseNumber', 'zipCode'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-900 dark:text-white">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                id={field}
                value={addressForm[field as keyof typeof addressForm]}
                onChange={handleInputChange}
                className="block w-full rounded-lg border p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
                readOnly={!isEditing} // אם לא עורכים, האינפוט יהיה רק לקריאה
                required
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleEditClick}
            className={`text-blue-500 hover:underline ${isEditing ? 'hidden' : 'block'}`}
          >
            <FiEdit className="inline-block" /> ערוך כתובת
          </button>
          {isEditing && (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="text-red-500 hover:underline"
              >
                cancle
              </button>
              <button
                type="button"
                className="w-full rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
                disabled={!Object.values(addressForm).every((val) => val !== '')}
                onClick={handleSave}
              >
                save adress
              </button>
            </>
          )}
        </div>
      {/* </form> */}
    </div>
  );
}

// 'use client';

// import React, { useState } from 'react';
// import { useUserStore } from '@/providers/userStore';
// import { FiEdit } from 'react-icons/fi'; // אייקון לעריכה (יש להתקין את react-icons במידת הצורך)
// import axios from 'axios';

// export default function AddressDetails() {
//   const { user, setUser } = useUserStore();
//   const [isEditing, setIsEditing] = useState(false);
//   const [addressForm, setAddressForm] = useState({
//     country: user?.address?.country || '',
//     city: user?.address?.city || '',
//     street: user?.address?.street || '',
//     houseNumber: user?.address?.houseNumber || '',
//     zipCode: user?.address?.zipCode || '',
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setAddressForm((prevForm) => ({
//       ...prevForm,
//       [id]: value,
//     }));
//   };

//   const handleEditClick = () => setIsEditing(true);

//   const handleSave = async () => {
//     // שמירת הכתובת בחנות ובשרת
//     try {
//       const updatedAddress = { ...addressForm };
//       // await axios.post('/api/updateAddress', { userId: user?.id, address: updatedAddress });
//       if (user) {
//         setUser({
//           ...user, address: updatedAddress,
//         });
//       }
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Failed to update address:', error);
//     }
//   };

//   return (
//     <div className="address-details space-y-4">
//       <h2 className="text-lg font-semibold text-gray-900 dark:text-white">פרטי כתובת</h2>

//       <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           {['country', 'city', 'street', 'houseNumber', 'zipCode'].map((field) => (
//             <div key={field}>
//               <label htmlFor={field} className="block text-sm font-medium text-gray-900 dark:text-white">
//                 {field.charAt(0).toUpperCase() + field.slice(1)}
//               </label>
//               <input
//                 type="text"
//                 id={field}
//                 value={addressForm[field as keyof typeof addressForm]}
//                 onChange={handleInputChange}
//                 className="block w-full rounded-lg border p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white"
//                 readOnly={!isEditing} // אם לא עורכים, האינפוט יהיה רק לקריאה
//                 required
//               />
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between">
//           <button
//             type="button"
//             onClick={handleEditClick}
//             className={`text-blue-500 hover:underline ${isEditing ? 'hidden' : 'block'}`}
//           >
//             <FiEdit className="inline-block" /> ערוך כתובת
//           </button>
//           <button
//             type="submit"
//             className={`w-full rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 ${isEditing ? '' : 'hidden'}`}
//             disabled={!Object.values(addressForm).every((val) => val !== '')}
//           >
//             שמור כתובת
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }