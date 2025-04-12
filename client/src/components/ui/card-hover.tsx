import * as React from "react";
import { cn } from "@/lib/utils";

const CardHover = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 adventure-card transform hover:-translate-y-1",
      className
    )}
    {...props}
  />
));
CardHover.displayName = "CardHover";

const CardHoverImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, alt, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("w-full h-56 object-cover", className)}
    alt={alt}
    {...props}
  />
));
CardHoverImage.displayName = "CardHoverImage";

const CardHoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6", className)}
    {...props}
  />
));
CardHoverContent.displayName = "CardHoverContent";

const CardHoverTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-bold text-gray-900", className)}
    {...props}
  />
));
CardHoverTitle.displayName = "CardHoverTitle";

const CardHoverDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-gray-600", className)}
    {...props}
  />
));
CardHoverDescription.displayName = "CardHoverDescription";

const CardHoverFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex justify-between items-center", className)}
    {...props}
  />
));
CardHoverFooter.displayName = "CardHoverFooter";

export {
  CardHover,
  CardHoverImage,
  CardHoverContent,
  CardHoverTitle,
  CardHoverDescription,
  CardHoverFooter
};
