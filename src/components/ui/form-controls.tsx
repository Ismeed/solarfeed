import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn("text-[0.95rem] font-semibold text-navy", className)} {...props} />
));
Label.displayName = "Label";

const fieldBase =
  "w-full rounded-2xl border border-line bg-white px-4 text-base text-ink shadow-[inset_0_1px_2px_rgb(2_27_47/0.04)] transition-[border-color,box-shadow] duration-200 placeholder:text-muted-2 hover:border-muted-2/60 focus-visible:border-hub focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hub/20 aria-[invalid=true]:border-alert aria-[invalid=true]:focus-visible:ring-alert/20";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(fieldBase, "h-12", className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => <textarea ref={ref} className={cn(fieldBase, "min-h-[9rem] resize-y py-3", className)} {...props} />,
);
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select ref={ref} className={cn(fieldBase, "h-12 appearance-none pr-11", className)} {...props}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-navy" aria-hidden="true" />
    </div>
  ),
);
Select.displayName = "Select";

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer grid size-6 shrink-0 place-items-center rounded-md border-2 border-muted-2 bg-white transition-colors hover:border-hub data-[state=checked]:border-hub data-[state=checked]:bg-hub aria-[invalid=true]:border-alert",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator>
      <Check className="size-4 text-white" strokeWidth={3} aria-hidden="true" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  thumbLabel: string;
  valueText?: string;
  tone?: "light" | "dark";
};

export const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, thumbLabel, valueText, tone = "light", ...props }, ref) => (
    <SliderPrimitive.Root ref={ref} className={cn("relative flex h-11 w-full touch-none select-none items-center", className)} {...props}>
      <SliderPrimitive.Track className={cn("relative h-2 w-full grow overflow-hidden rounded-full", tone === "dark" ? "bg-white/15" : "bg-line")}>
        <SliderPrimitive.Range className="absolute h-full bg-hub" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label={thumbLabel}
        aria-valuetext={valueText}
        className="block size-7 cursor-grab rounded-full border-[3px] border-hub bg-white shadow-lift transition-transform duration-200 hover:scale-110 focus-visible:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hub/30 active:cursor-grabbing"
      />
    </SliderPrimitive.Root>
  ),
);
Slider.displayName = "Slider";
