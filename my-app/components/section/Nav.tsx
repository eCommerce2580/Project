"use client";
import { useState, useEffect } from "react";
import CommandMenu from "../ui/CommandMenu";
import Login from "../ui/Login";
import Menu from "../ui/Menu";
import ThemeToggle from "../ui/ThemeToggle";
import Avatar from "../Avatar";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";
import SubcategoryMenu from "../ui/SubcategoryMenu";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { RootState } from "@/app/store/types"; // ייבוא הטיפוס RootState
import { login } from "@/app/store/slices/userSlice"; // ייבוא הפעולה שמעדכנת את ה-user ב-Redux
import axios from "axios";

let user: string;

export default function Nav() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>("");

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { data: session } = useSession();

  const categories = [
    { name: "נשים", subcategory: ["נעליים", "שמלות", "חצאיות"] },
    { name: "גברים", subcategory: ["נעליים", "חולצות", "מכנסיים"] },
    { name: "ילדים", subcategory: ["נעליים", "שמלות", "פיזמות"] },
    { name: "תנוקות", subcategory: ["נעליים", "אוברול", "שמיכות"] },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user && !user.isAuthenticated) {
        try {
          const response = await axios.get(`http://localhost:3000/api/getUser/${session.user.email}`);
          const userData = response.data.user;
          console.log("user", userData);
          dispatch(login(userData));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, [session, dispatch, user.isAuthenticated]);
  return (
    <>
      <nav className="lg:justify-start lg:flex-wrap px-3 justify-between items-center relative flex flex-no-wrap bg-white border-gray-200 dark:bg-gray-900 bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700">
        <div className="flex w-full flex-wrap items-center justify-between px-0">
          {/* Mobile Menu Toggle */}
          <button
            className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-twe-collapse-init
            data-twe-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <VscThreeBars />
          </button>

          <div
            className="hidden flex-grow basis-[100%] items-center lg:flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-twe-collapse-item
          >
            {/* תמונה */}
            <a
              className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 dark:text-neutral-200 lg:mb-0 lg:mt-0"
              href="#"
            >
              <img
                src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                style={{ height: "15px" }}
                alt="TE Logo"
                loading="lazy"
              />
            </a>
            Navbar Links
            <ul className="list-style-none me-auto flex flex-col ps-0 lg:flex-row">
              <li className="mb-4 lg:mb-0 lg:pe-2">
                <a
                  className="text-black/60 transition duration-200 hover:text-black/80 dark:text-white/60 dark:hover:text-white/80 lg:px-2"
                  href="#"
                >
                  Dashboard
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

          {/* עגלת קניות */}
          <div className="relative flex items-center">
            <a className="me-4 text-neutral-600 dark:text-white" href="#">
              <span className="[&>svg]:w-5">
                <FaShoppingCart />
              </span>
            </a>

            {/* הערות */}
            <div
              className="relative"
              data-twe-dropdown-ref
              data-twe-dropdown-alignment="end"
            >
              <a
                className="me-4 flex items-center text-neutral-600 dark:text-white"
                href="#"
                id="dropdownMenuButton1"
                role="button"
                data-twe-dropdown-toggle-ref
                aria-expanded="false"
              >
                <span className="[&>svg]:w-5">
                  <FaBell />
                </span>
                <span className="absolute -mt-4 ms-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
                  1
                </span>
              </a>
            </div>

            {/* profile */}
            {user.isAuthenticated ? (
              <div
                className="relative"
                data-twe-dropdown-ref
                data-twe-dropdown-alignment="end"
              >
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
              {categories.map((category, index) => (
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
                  {hoveredCategory === category.name && (
                    <SubcategoryMenu subcategories={category.subcategory} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
