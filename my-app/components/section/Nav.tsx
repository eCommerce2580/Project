"use client";
import { useState, useEffect } from "react";
import CommandMenu from "../ui/CommandMenu";
import Login from "../ui/Login";
import Menu from "../ui/Menu";
import ThemeToggle from "../ui/ThemeToggle";
import Avatar from "../ui/Avatar";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";
import SubcategoryMenu from "../ui/SubcategoryMenu";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Nav() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>("");
  const [categories, setCategories] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/categories');
        setCategories(data.categories);
        console.log("categories", data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <nav className="lg:justify-start lg:flex-wrap px-3 justify-between items-center relative flex flex-no-wrap bg-white border-gray-200 dark:bg-gray-900 bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700">
        <div className="flex w-full flex-wrap items-center justify-between px-0">
          <button
            className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            aria-label="Toggle navigation"
          >
            <VscThreeBars />
          </button>

          <div className="hidden flex-grow basis-[100%] items-center lg:flex lg:basis-auto">
            <a className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 dark:text-neutral-200 lg:mb-0 lg:mt-0">
              <img
                src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                style={{ height: "15px" }}
                alt="TE Logo"
                loading="lazy"
              />
            </a>
            <ul className="list-style-none me-auto flex flex-col ps-0 lg:flex-row">
              <li className="mb-4 lg:mb-0 lg:pe-2">
                <a
                  className="text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                  href="/contact"
                >
                  Contact us
                </a>
              </li>
              <li className="mb-4 lg:mb-0 lg:pe-2">
                <a
                  className="text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                  href="#"
                >
                  Team
                </a>
              </li>
              <li className="mb-4 lg:mb-0 lg:pe-2">
                <a
                  className="text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                  href="#"
                >
                  Projects
                </a>
              </li>
            </ul>
            <CommandMenu />
            <ThemeToggle />
          </div>

          <div className="relative flex items-center">
            <a href={`/cart`} className="me-4 text-neutral-600 dark:text-white">
              <span className="[&>svg]:w-5">
                <FaShoppingCart />
              </span>
            </a>

            <div
              className="relative"
            >
              <a
                className="me-4 flex items-center text-neutral-600 dark:text-white"
                href="#"
              >
                <span className="[&>svg]:w-5">
                  <FaBell />
                </span>
                <span className="absolute -mt-4 ms-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
                  1
                </span>
              </a>
            </div>

            {/* Profile / Login */}
            {session ? (
              <div className="relative">
                <Avatar />
              </div>
            ) : (
              <div className="flex w-full flex-row justify-between">
                <Login />
              </div>
            )}
          </div>
        </div>
      </nav>

      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm relative">
              {categories &&
                categories.map((category: any, index: any) => (
                  <li
                    key={index}
                    className="relative"
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <a
                      href={`/products/${category.name}`}
                      className="text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
