import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Card Component
const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Card({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

// CardHeader Component
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
    );
  }
);
CardHeader.displayName = "CardHeader";

// CardTitle Component
const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...props }, ref) {
    return (
      <h3
        ref={ref}
        className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
        {...props}
      />
    );
  }
);
CardTitle.displayName = "CardTitle";

// CardDescription Component
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className, ...props }, ref) {
    return (
      <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
    );
  }
);
CardDescription.displayName = "CardDescription";

// CardContent Component
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...props }, ref) {
    return (
      <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
    );
  }
);
CardContent.displayName = "CardContent";

// CardFooter Component
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
    );
  }
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
