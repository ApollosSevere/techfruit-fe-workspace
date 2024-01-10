// components/Dropdown.js
import { useState } from "react";
import Link from "next/link";
import { useLogoutMutation } from "@/redux/authService/authServiceEndpoints";
import { TOKEN } from "@/redux/auth/slice";
import { useAppSelector } from "@/redux/utils/hooks";
import { selectAccessToken } from "@/redux/auth/selector";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

export const LogoutDropdown = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const token = window.localStorage.getItem(TOKEN);
  const accessToken = useAppSelector(selectAccessToken);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const payload = await logout(token || accessToken).unwrap();
      console.log("fulfilled", payload);
      window.localStorage.removeItem(TOKEN);
      router.push("/sign-in");
    } catch (error) {
      console.error("rejected", error);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="flex items-center text-white focus:outline-none"
        onClick={handleToggle}
      >
        <img
          src="https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" // Replace with your unknown user image source
          alt="Unknown User"
          className="w-8 h-8 rounded-full mr-2"
        />
        <svg
          className="w-6 h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 0 0 1-1V4a1 1 0 0 0-2 0v7a1 1 0 0 0 1 1zm-5.707-.293a1 1 0 1 0 1.414 1.414L8 9.414V17a1 1 0 1 0 2 0V9.414l2.293 2.293a1 1 0 1 0 1.414-1.414l-4-4a1 1 0 0 0-1.414 0l-4 4z"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
          <button
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );

  //   return (
  //     <div className="relative inline-block text-left">
  //       <div>
  //         <button
  //           type="button"
  //           className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
  //           id="options-menu"
  //           onClick={handleToggle}
  //         >
  //           <img
  //             className="w-6 h-6 mr-2 rounded-full"
  //             src="https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" // Replace with your unknown user image source
  //             alt="Unknown User"
  //           />
  //           Menu
  //         </button>
  //       </div>
  //       {isOpen && (
  //         <div className="absolute right-0 mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
  //           <Link href="/"></Link>
  //           <button
  //             className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  //             onClick={handleLogout}
  //           >
  //             Logout
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   );
};
