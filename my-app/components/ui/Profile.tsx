"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import { User, Mail, MapPin, Edit2, Trash2, Check, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/types';
import axios from 'axios';

interface FormData {
  fullName: string;
  email: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  addressId: string;
}

const DetailRow: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  isEditing: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ icon: Icon, label, value, isEditing, onChange }) => (
  <div className="flex-1 px-2">
    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center">
      <Icon className="h-4 w-4 mr-2 text-blue-500" />
      {label}
    </label>
    {isEditing ? (
      <input
        type={label === "Email Address" ? "email" : "text"}
        onChange={onChange}
        value={value}
        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    ) : (
      <div className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700">
        {value}
      </div>
    )}
  </div>
);

const AddressSection: React.FC<{
  formData: FormData;
  isEditing: boolean;
  onChange: (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ formData, isEditing, onChange }) => (
  <div className="mt-6 pt-6">
    <div className="flex items-center mb-4">
      <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800 mr-3">
        <MapPin className="h-5 w-5" />
      </span>
      <h4 className="text-lg font-medium text-gray-800 dark:text-white">Address Details</h4>
    </div>
    <div className="space-y-4">
      <div className="-mx-2 md:items-center md:flex">
        <DetailRow
          icon={MapPin}
          label="Country"
          value={formData.country}
          isEditing={isEditing}
          onChange={onChange('country')}
        />
        <DetailRow
          icon={MapPin}
          label="City"
          value={formData.city}
          isEditing={isEditing}
          onChange={onChange('city')}
        />
      </div>
      <div className="-mx-2 md:items-center md:flex">
        <DetailRow
          icon={MapPin}
          label="Street"
          value={formData.street}
          isEditing={isEditing}
          onChange={onChange('street')}
        />
        <DetailRow
          icon={MapPin}
          label="House Number"
          value={formData.houseNumber}
          isEditing={isEditing}
          onChange={onChange('houseNumber')}
        />
      </div>
      <div className="-mx-2 md:items-center">
        <DetailRow
          icon={MapPin}
          label="Zip Code"
          value={formData.zipCode}
          isEditing={isEditing}
          onChange={onChange('zipCode')}
        />
      </div>
    </div>
  </div>
);
 
export default function UserDetails() {
  const userState = useSelector((state: RootState) => state.user);
  let user = { ...userState, country: "israel", city: "jerusalem", street: "thodor lavi", houseNumber: "10", zipCode: "9728172" };
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: user.name || '',
    email: user.email || '',
    country: user.country || '',
    city: user.city || '',
    street: user.street || '',
    houseNumber: user.houseNumber || '',
    zipCode: user.zipCode || '',
    addressId: user.addressId || ''
  });
  useEffect(() => {
    if (!isEditing) {
      const newFormData = {
        fullName: user.name || '',
        email: user.email || '',
        country: user.country || '',
        city: user.city || '',
        street: user.street || '',
        houseNumber: user.houseNumber || '',
        zipCode: user.zipCode || '',
        addressId: user.addressId || ''
      };
  
      // Only update state if formData is different
      if (JSON.stringify(formData) !== JSON.stringify(newFormData)) {
        setFormData(newFormData);
      }
    }
  }, [isEditing]);
  

  const handleInputChange = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsLoading(true);
      try {
        await axios.delete(`/api/users/${user.id}`);
      } catch (error) {
        console.error('Error deleting user:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

 const handleUpdate = async () => {
    setIsLoading(true);
    try {
        const response = await axios.put(`http://localhost:3000/api/updateUser/${user.email}`, formData);
        setIsEditing(false);
        alert('Profile updated successfully!'); // or use a toast notification
    } catch (error) {
        console.error('Error updating user:', error);
        alert('Failed to update profile. Please try again.'); // user feedback
    } finally {
        setIsLoading(false);
    }
};


  if (!user.isAuthenticated) {
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-12 mx-auto text-center">
          <p className="font-medium text-blue-500 dark:text-blue-400">Access Denied</p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
            Please log in to view your profile
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div>
          <p className="font-medium text-blue-500 dark:text-blue-400">Profile Settings</p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
            Manage Your Account
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Update your personal information and manage your account settings
          </p>
        </div>

        <div className="mt-10">
          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="space-y-4">
              <div className="-mx-2 md:items-center md:flex">
                <DetailRow
                  icon={User}
                  label="Full Name"
                  value={formData.fullName}
                  isEditing={isEditing}
                  onChange={handleInputChange('fullName')}
                />
                <DetailRow
                  icon={Mail}
                  label="Email Address"
                  value={formData.email}
                  isEditing={isEditing}
                  onChange={handleInputChange('email')}
                />
              </div>

              <AddressSection
                formData={formData}
                isEditing={isEditing}
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 text-sm font-medium tracking-wide text-gray-600 capitalize transition-colors duration-300 transform bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-6 py-3 text-sm font-medium tracking-wide text-gray-600 capitalize transition-colors duration-300 transform bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}