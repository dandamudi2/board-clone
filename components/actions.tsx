"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Delete, Edit, Link2, Pencil } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";

import { ConfirmModal } from "./confirm-modal";
import { api } from "@/convex/_generated/api";
import { Button } from "./ui/button";

// import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) => {
  const { mutate, pending } = useApiMutation(api.board.remove);
  const OnCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then((id) => {
        toast.success("Link copied");
      })
      .catch((error) => {
        toast.error("Failed to copy link");
      });
  };

  const OnDeleteClick = () => {
    mutate({
      id: id,
    })
      .then((id) => {
        toast.success("Board deleted");
      })
      .catch((error) => {
        toast.error("Failed to delete!");
      });
  };

  return (
    <div className="absolute z-50 top-1 right-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => e.stopPropagation()}
          side={side}
          sideOffset={sideOffset}
          className="w-60"
        >
          <DropdownMenuItem onClick={OnCopyLink} className="p-3 cursor-pointer">
            <Link2 className="h-4 w-4 mr-2" />
            Copy board Link
          </DropdownMenuItem>
          <ConfirmModal
            header="Delete board"
            onConfirm={OnDeleteClick}
            description="This will delete the board and all of its contents "
            disabled={pending}
          >
            <Button
              variant="ghost"
              className="cursor-pointer text-sm w-full justify-start"
            >
              <Delete className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </ConfirmModal>
          <DropdownMenuItem className="p-3 cursor-pointer">
            <Edit className="h-4 w-4 mr-2" />
            Rename
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
