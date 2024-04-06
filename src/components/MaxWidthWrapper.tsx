import { cn } from "@/lib/utils/utils";
import { ReactNode } from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

const MaxWidthWrapper = ({ className, children }: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn("max-w-screen-xs mx-auto w-full px-6 lg:px-16", className)}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
