import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-white bg-white px-3 py-2  ring-offset-bg-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#588175] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-sm sm:text-base",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
