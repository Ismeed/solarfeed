import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-brand hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[1.15em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-hub text-white shadow-[0_8px_20px_-8px_rgb(14_110_197/0.6)] hover:bg-hub-dark hover:shadow-[0_14px_28px_-10px_rgb(14_110_197/0.7)]",
        secondary: "border border-line bg-white text-navy shadow-soft hover:border-navy/25 hover:shadow-lift",
        navy: "bg-navy text-white hover:bg-ink hover:shadow-lift",
        light: "bg-white text-navy shadow-soft hover:shadow-lift",
        outlineLight: "border border-white/50 bg-white/5 text-white hover:border-white hover:bg-white/10",
        ghost: "text-navy hover:bg-navy/5",
      },
      size: {
        sm: "h-11 px-5 text-[0.95rem]",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-7 text-[1.0625rem]",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
