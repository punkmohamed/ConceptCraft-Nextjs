"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Trash } from "lucide-react"; // Import the delete icon from Lucide


const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuContent = DropdownMenuPrimitive.Content;
const DropdownMenuItem = DropdownMenuPrimitive.Item;

// Confirmation Dialog Component
const ConfirmationDialog = ({
  isOpen,
  onConfirm,
  onClose,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg mb-4">Are you sure you want to delete this item?</p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AppDropdownMenu() {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const handleDelete = () => {
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setDialogOpen(false);
    // Perform delete action here
    console.log("Item deleted");
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-gray-200 p-2 rounded-full">
        {/* Your Trigger Element Here */}
        Options
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white rounded-lg p-2 shadow-md">
        <DropdownMenuItem className="flex items-center gap-2" onClick={handleDelete}>
          <Trash className="w-4 h-4 text-red-600" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDialog}
      />
    </DropdownMenu>
  );
}
