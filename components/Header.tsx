"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

// Components
import Button from "./Button";

// Icons
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter();
  const logout = () => {
    // TODO Handle logout in the future
  };
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            className="bg-black rounded-full flex items-center justify-center hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button className="bg-black rounded-full flex items-center justify-center hover:opacity-75 transition">
            <RxCaretRight
              size={35}
              className="text-white"
              onClick={() => router.forward()}
            />
          </button>
        </div>
        {/* View Mobile */}
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome size={20} className="text-black" />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch size={20} className="text-black" />
          </button>
        </div>
        {/* View Mobile End */}
        <div className="flex items-center justify-between gap-x-4">
          <>
            <div>
              <Button
                className="bg-transparent text-neutral-300 font-medium "
                onClick={() => {}}
              >
                Sign up
              </Button>
            </div>
            <div>
              <Button className="bg-white py-2 px-6" onClick={() => {}}>
                Log in
              </Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
