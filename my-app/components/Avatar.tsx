import { MdOutlinePayment } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { GrHistory } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import { GoSignOut } from "react-icons/go";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "next-auth/react"; 
import { logout } from "@/app/store/slices/userSlice"; 

export default function Avatar() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  async function handleSignOut(): Promise<void> {
    try {
      // Sign out using next-auth, this will clear session and cookies automatically
      await signOut({ redirect: false }); // אם לא רוצים לבצע redirect אוטומטי

      // Dispatch action to clear user state in Redux store
      dispatch(logout());

      // ניקוי cookies מותאם אישית אם יש (לא חובה אם next-auth כבר מטפל בזה)
      document.cookie = "next-auth.session-token=; Max-Age=0; path=/";
      document.cookie = "next-auth.callback-url=; Max-Age=0; path=/";
    } catch (error) {
      console.error("Error during sign-out", error);
    }
  }
  return (
    <>
      <DropdownMenu.Root>
      <DropdownMenu.Trigger className="p-2">
          <a
            className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
            href="#"
            id="dropdownMenuButton2"
            role="button"
            aria-expanded="false"
          >
            {user.image? (
              <img
                src={user.image}
                className="rounded-full border-2 border-gray-600" 
                style={{ height: "32px", width: "32px" }}
                alt="User Avatar"
                loading="lazy"
              />
            ) : (
              <FaUserCircle size={27} className="text-lg text-gray-600" />
            )}
          </a>
        </DropdownMenu.Trigger>

        {/* DropDownMenu */}
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className=" absolute z-10 min-w-[200px] overflow-auto rounded-lg border border-slate-200 bg-white p-2 shadow-lg shadow-sm right-1 top-2"
            align="end"
          >
            {/* Items */}
            <DropdownMenu.Item
              className="mb-2 flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100"
            >
              <Link href="/userDetails" className="flex items-center">
                <FaCircleUser className="text-lg text-gray-600" />
                <p className="text-slate-800 font-medium ml-3">My Profile</p>
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              className="mb-2 flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100"
            >
              <MdOutlinePayment className="text-lg text-gray-600" />
              <p className="text-slate-800 font-medium ml-3">Payment</p>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              className="mb-2 flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100"
            >
              <GrHistory className="text-lg text-gray-600" />
              <p className="text-slate-800 font-medium ml-3">My Orders</p>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              className="mb-2 flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100"
            >
              <CiHeart className="text-lg text-gray-600" />
              <p className="text-slate-800 font-medium ml-3">Favorites</p>
            </DropdownMenu.Item>

            <DropdownMenu.Separator className="my-1 border-t border-slate-200" />

            <DropdownMenu.Item
              className="mb-2 flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100"
              onClick={() => handleSignOut()}
            >
              <GoSignOut className="text-lg text-gray-600" />
              <p className="text-slate-800 font-medium ml-3">Sign Out</p>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
}
