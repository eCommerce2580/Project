"use client";
import { useState, useEffect, useRef } from "react";
import CommandMenu from "../ui/CommandMenu";
import Login from "../ui/Login";
import ThemeToggle from "../ui/ThemeToggle";
import Avatar from "../ui/Avatar";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";
import SubcategoryMenu from "../ui/SubcategoryMenu";
import { useSession } from "next-auth/react";
import { RootState } from "@/app/store/types";
import { login } from "@/app/store/slices/userSlice";
import axios from "axios";
import Link from "next/link";

interface CategoryRefs {
  [key: string]: HTMLDivElement | null;
}

export default function Nav() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>("");
  const [categories, setCategories] = useState([]);

  const [subcategories, setSubcategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const categoryRefs = useRef<CategoryRefs>({});

  const { data: session } = useSession();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/categories');
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user) {
        try {
          const response = await axios.get(`http://localhost:3000/api/getUser/${session.user.email}`);
          const userData = response.data.user;
          console.log("user", userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUser();
  }, [session,]);

  const fetchSubCategories = async (categoryId: string) => {
    try {
      const { data } = await axios.get(`/api/filteredSubCategory/${categoryId}`);
      setSubcategories(data.filteredSubCategory);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleCategoryHover = (categoryName: string, categoryId: string) => {
    const categoryElement = categoryRefs.current[categoryName];
    if (categoryElement) {
      const rect = categoryElement.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
    setHoveredCategory(categoryName);
    fetchSubCategories(categoryId);
  };

  const setCategoryRef = (name: string) => (el: HTMLDivElement | null) => {
    categoryRefs.current[name] = el;
  };

  // Add click outside handler to close subcategory menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (hoveredCategory) {
        const target = event.target as HTMLElement;
        const isSubcategoryMenu = target.closest('.subcategory-menu');
        const isCategoryItem = target.closest('.category-item');

        if (!isSubcategoryMenu && !isCategoryItem) {
          setHoveredCategory(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [hoveredCategory]);

  return (
    <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
            >
              <VscThreeBars className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center ml-2">
              <img
                src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                alt="Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>


          {/* Desktop Navigation & Search */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-between lg:space-x-4">
            <div className="flex space-x-4">
              <Link
                href="/contact"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Contact us
              </Link>
              <Link
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Team
              </Link>
              <Link
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"

              >
                Projects
              </Link>
            </div>

            <div className="flex-1 px-4">
              <CommandMenu />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <Link href="/cart" className="relative p-2 text-gray-400 transition-colors duration-200 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400">
              <FaShoppingCart className="h-5 w-5" />
            </Link>

            <button className="relative p-2 text-gray-400 transition-colors duration-200 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400">
              <FaBell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-400 text-xs text-white">
                1
              </span>
            </button>

            {/* Profile / Login */}
            {session ? (
              <div className="relative">
                <Avatar />
              </div>

            ) : (
              <Login />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <div className="mb-4">
                <CommandMenu />
              </div>

              <Link
                href="/contact"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300"
              >
                Contact us
              </Link>
              <Link
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300"
              >
                Team
              </Link>
              <Link
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300"
              >
                Projects
              </Link>
            </div>
          </div>
        )}
      </nav>
{/* mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm relative">
              {categories &&
                categories.map((category: any, index: any) => (
                  <li
                    key={index}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredCategory(category.name);
                      fetchSubCategories(category.id);
                    }}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <Link
                      href={`http://localhost:3000/products/${category.name}`}
                      className="text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                    >
                      {category.name}
                    </Link>

                    {hoveredCategory === category.name && (
                      <SubcategoryMenu subcategories={subcategories} categoryName={category.name}/>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>

    </div>
  );
}