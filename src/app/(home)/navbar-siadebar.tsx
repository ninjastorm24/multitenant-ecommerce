import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import Link from "next/link";
import React from "react";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NavbarSideabr = ({ items, onOpenChange, open }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none border-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => {
            return (
              <Link
                className="flex w-full p-4 items-center text-lg font-medium hover:bg-black hover:text-white"
                href={item.href}
                key={item.href}
                onClick={() => onOpenChange(false)}
              >
                {item.children}
              </Link>
            );
          })}

          <div className="border-t">
            <Link
              onClick={() => onOpenChange(false)}
              className="flex w-full p-4 items-center text-lg font-medium hover:bg-black hover:text-white"
              href={"/sign-in"}
            >
              Login
            </Link>
            <Link
              onClick={() => onOpenChange(false)}
              className="flex w-full p-4 items-center text-lg font-medium hover:bg-black hover:text-white"
              href={"/sign-up"}
            >
              Start Selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSideabr;
