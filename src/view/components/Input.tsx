import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, id, name, error, className, ...props }, ref) => {
    const inputId = id || name;
    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          className={cn(
            "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none",
            error && "!border-red-900",
            className
          )}
          placeholder=" "
        />
        <label
          htmlFor={inputId}
          className="absolute left-[13px] top-2 pointer-events-none text-gray-700 text-xs peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base transition-all"
        >
          {placeholder}
        </label>

        {error && (
          <div className="flex items-center gap-2 text-red-900 mt-2">
            <CrossCircledIcon className="size-4" />
            <span className="text-xs flex items-center gap-1">{error}</span>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
