import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-desert-gold to-desert-gold-light text-white hover:from-desert-gold-dark hover:to-desert-gold shadow-lg hover:shadow-xl hover:-translate-y-0.5",
        destructive: "bg-balloon-red text-white hover:bg-balloon-red-light",
        outline: "border-2 border-desert-gold text-desert-gold hover:bg-desert-gold hover:text-white",
        secondary: "bg-sand-beige text-dark-base hover:bg-sand-beige-dark",
        ghost: "hover:bg-sand-beige/50 text-dark-base",
        link: "text-desert-gold underline-offset-4 hover:underline",
        dark: "bg-dark-base text-white hover:bg-dark-base-light",
      },
      size: {
        default: "h-11 px-8 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-10 text-base",
        icon: "h-10 w-10",
        pill: "h-11 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
