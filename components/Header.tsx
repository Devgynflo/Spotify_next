"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

// Components
import Button from "./Button";
// Icons
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
//Hooks
import useAuthModal from "@/hooks/UseAuthModal";
import { useUser } from "@/hooks/useUser";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter();
  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    /* // TODO Reset any playing Songs  */
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged In')
    }
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
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button className="bg-white px-6 py-2" onClick={handleLogout}>
                Logout
              </Button>
              <Button
                className="bg-white"
                onClick={() => {
                  router.push("/account");
                }}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  className="bg-transparent text-neutral-300 font-medium "
                  onClick={authModal.onOpen}
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  className="bg-white py-2 px-6"
                  onClick={authModal.onOpen}
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
