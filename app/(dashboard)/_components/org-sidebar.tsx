"use client";

import Link from "next/link";

import Image from "next/image";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const searchParams = useSearchParams();

  const favorites = searchParams.get("favorites");

  return (
    <div
      className="hidden lg:flex flex-col
     space-y-6 w-[206px] pl-5 pt-5"
    >
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src="/logo.svg" alt="Logo" height={60} width={60} />
          <span className={cn("font-semibold text-2xl ", font.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadisu: "8px",
              border: "1px solid #E5E7EB",
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          asChild
          variant={favorites ? "ghost" : "secondary"}
          size="lg"
          className="w-full px-2 justify-start font-normal"
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team boards
          </Link>
        </Button>

        <Button
          asChild
          variant={favorites ? "secondary" : "ghost"}
          size="lg"
          className="w-full px-2 justify-start font-normal"
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className="h-4 w-4 mr-2" />
            Favorites boards
          </Link>
        </Button>
      </div>
    </div>
  );
};
