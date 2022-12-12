import Link from "next/link";
import React from "react";
import { Button } from "@chakra-ui/react";
import { NavLinks } from "./NavLinks";

export const Sidebar = () => {
  return (
    <aside className="sticky top-0 left-0 pl-2 py-3 h-screen hidden md:flex flex-col">
      <div className="flex-1 flex flex-col">
        <Link href="/" className="px-2 grid place-content-center">
          <img src="/assets/logo.svg" className="w-10 h-10" />
        </Link>

        <div className="mt-6 flex-1 p-2 flex flex-col items-center justify-between bg-gray-800 rounded-lg">
          <div className="flex flex-col items-center justify-center gap-2">
            <NavLinks
              iconClassName="w-8 h-8"
              activeClassName="bg-black/40 rounded-lg text-[#2a6dff]"
              showTooltip
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
