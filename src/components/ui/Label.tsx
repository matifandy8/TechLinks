import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const labelVariants = cva(
  "max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center",
  {
    variants: {
      size: {
        default: "text-base sm:text-lg",
        sm: "text-sm sm:text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        {...props}
        className={cn(labelVariants({ size, className }))}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";

export default Label;
