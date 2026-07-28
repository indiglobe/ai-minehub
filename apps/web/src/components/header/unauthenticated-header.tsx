import type { ComponentProps } from "react";

import Navbar from "@/components/header/unauthenticated-navbar";

export default function Header({
  className,
  ...props
}: ComponentProps<"header">) {
  return (
    <header {...props}>
      <Navbar />
    </header>
  );
}
