"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import { User, Mail, MapPin, Edit2, Trash2, Check, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/types';
import axios from 'axios';

interface FormData {
  fullName: string;
  email: string;
  address: string;
}

const DetailRow: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  isEditing: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ icon: Icon, label, value, isEditing, onChange }) => (
  <div className="flex items-center space-x-4 p-4 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
    <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      {isEditing ? (
        <input
          type={label === "Email Address" ? "email" : "text"}
          onChange={onChange}
          value={value}
          className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      ) : (
        <p className="text-base text-gray-900 dark:text-white truncate">{value}</p>
      )}
    </div>
  </div>
);
 
export default function UserDetails() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: user.name || '',
    email: user.email || '',
    address: user.address || ''
  });

  useEffect(() => {
    if (isEditing) {
      setFormData({
        fullName: user.name || '',
        email: user.email || '',
        address: user.address || ''
      });
    }
  }, [isEditing, user]);

  const handleInputChange = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsLoading(true);
      try {
        await axios.delete(`/api/users/${user.id}`);
        // dispatch(logout());
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
      // dispatch(updateUser(response.data));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.name || '',
      email: user.email || '',
      address: user.address || ''
    });
    setIsEditing(false);
  };

  if (!user.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Please log in to view your profile</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Details</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your personal information and account settings</p>
        </div>

        <div className="px-6 py-5 space-y-1">
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
          <DetailRow
            icon={MapPin}
            label="Address"
            value={formData.address}
            isEditing={isEditing}
            onChange={handleInputChange('address')}
          />
        </div>

        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-600 rounded-md text-sm font-medium text-red-700 dark:text-red-200 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
