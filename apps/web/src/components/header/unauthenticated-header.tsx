import type { ComponentProps } from "react";

import Navbar from "@/components/header/unauthenticated-navbar";

export function UnauthenticatedHeader({
  className,
  ...props
}: ComponentProps<"header">) {
  return (
    <header {...props}>
      <Navbar />
    </header>
  );
}
