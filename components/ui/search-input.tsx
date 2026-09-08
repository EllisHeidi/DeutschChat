"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, type InputProps } from "@/components/ui/input";

type SearchInputProps = Omit<InputProps, "type"> & {
  onClear?: () => void;
};

function SearchInput({
  className,
  value,
  onClear,
  "aria-label": ariaLabel = "Suchen",
  ...props
}: SearchInputProps) {
  const showClear = onClear && typeof value === "string" && value.length > 0;
  return (
    <div className="relative">
      <Search
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
        aria-hidden
      />
      <Input
        type="search"
        value={value}
        aria-label={ariaLabel}
        className={cn("pl-10", showClear && "pr-10", className)}
        {...props}
      />
      {showClear ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Suche zurücksetzen"
          className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-sm focus-visible:ring-2 focus-visible:outline-none"
        >
          <X className="size-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

export { SearchInput, type SearchInputProps };
