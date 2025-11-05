"use client"; // This component must be a Client Component

import React from "react";
import { LogoutButtonProps } from "../types";
// import { useRouter } from "next/navigation"; // No longer needed
import { signOut } from "next-auth/react";

const LogoutButton = ({ children }: LogoutButtonProps) => {
  // const router = useRouter(); // Removed, as signOut handles this

  const onLogout = () => {
    // No need for async/await, signOut will handle the redirect/refresh
    signOut();
    // await signOut() // (This is also valid)
    // router.refresh(); // Removed, this is redundant
  };

  return (
    <span className="cursor-pointer" onClick={onLogout}>
      {children}
    </span>
  );
};

export default LogoutButton;
