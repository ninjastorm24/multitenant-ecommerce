"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import NavbarSideabr from "./navbar-siadebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ children, isActive, href }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full border-transparent hover:border-primary px-3.5 text-lg",
        isActive && "bg-primary text-white hover:bg-primary hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href={"/"} className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funroad
        </span>
      </Link>

      <NavbarSideabr
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      <div className="lg:flex hidden items-center gap-4 ">
        {navbarItems.map((item) => (
          <NavbarItem
            href={item.href}
            key={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      <div className="lg:hidden flex items-center justify-center">
        <Button
          variant={"ghost"}
          className="border-transparent bg-white size-12"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="hidden lg:flex items-center justify-center h-full">
        <Button
          asChild
          variant={"secondary"}
          className="border-0 border-l px-12 h-full rounded-none hover:bg-pink-400 bg-white text-black text-lg trasnisition-colors"
        >
          <Link href={"/sign-in"}>Login</Link>
        </Button>
        <Button
          asChild
          className="border-0 border-l px-12 h-full rounded-none hover:bg-pink-400 bg-black text-white text-lg trasnisition-colors hover:text-black"
        >
          <Link href={"/sign-up"}>Start Selling</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
