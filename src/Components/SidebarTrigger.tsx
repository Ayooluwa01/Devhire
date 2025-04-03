"use client";
import { useState } from "react";

// SidebarTrigger component that toggles sidebar visibility
export function SidebarTrigger({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button onClick={onClick} className={className}>
      Toggle Sidebar
    </button>
  );
}
