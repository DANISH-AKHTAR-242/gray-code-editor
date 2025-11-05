"use client";

import { Button } from "@/components/ui/button";
import { StarIcon, StarOffIcon } from "lucide-react";
import React, {
  useState,
  useEffect,
  forwardRef,
  useTransition, // Import useTransition
} from "react";
import { toast } from "sonner";
import { markAsFavorite } from "../actions"; // FIX: Import the corrected action
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react"; // Import a loader icon

interface MarkedToggleButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  markedForRevision: boolean;
  id: string;
}

export const MarkedToggleButton = forwardRef<
  HTMLButtonElement,
  MarkedToggleButtonProps
>(({ markedForRevision, id, onClick, className, children, ...props }, ref) => {
  const [isMarked, setIsMarked] = useState(markedForRevision);
  const [isPending, startTransition] = useTransition(); // Add transition state

  useEffect(() => {
    setIsMarked(markedForRevision);
  }, [markedForRevision]);

  const handleToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Call the original onClick if provided by the parent (DropdownMenuItem)
    onClick?.(event);

    const newMarkedState = !isMarked;
    // Optimistically update the UI
    setIsMarked(newMarkedState);

    startTransition(async () => {
      try {
        // FIX: Call the correct, idempotent server action
        const res = await markAsFavorite(id, newMarkedState);
        const { success, error, isMarked: newIsMarked } = res;

        if (success && !error) {
          if (newIsMarked) {
            toast.success("Added to Favorites");
          } else {
            toast.success("Removed from Favorites");
          }
        } else {
          // Handle server-side error
          throw new Error(error || "Failed to update favorite status");
        }
      } catch (error) {
        console.error("Failed to toggle mark for revision:", error);
        // Revert state if the update fails
        setIsMarked(!newMarkedState);
        // FIX: Add error toast
        toast.error(
          error instanceof Error ? error.message : "An error occurred"
        );
      }
    });
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      // FIX: Use cn() for cleaner class merging
      className={cn(
        "flex items-center justify-start w-full px-2 py-1.5 text-sm rounded-md cursor-pointer",
        className
      )}
      onClick={handleToggle}
      disabled={isPending} // FIX: Disable button while pending
      {...props}
    >
      {isPending ? (
        <Loader2 size={16} className="mr-2 animate-spin" />
      ) : isMarked ? (
        <StarIcon size={16} className="text-red-500 mr-2" />
      ) : (
        <StarOffIcon size={16} className="text-gray-500 mr-2" />
      )}
      {children || (isMarked ? "Remove Favorite" : "Add to Favorite")}
    </Button>
  );
});

MarkedToggleButton.displayName = "MarkedToggleButton";
