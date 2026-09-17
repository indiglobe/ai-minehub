import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { LogoIconFilled } from "@repo/ui/logo";
import { Button } from "@repo/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@repo/ui/navigation-menu";
import { useNavbarState } from "@/hooks/use-navstate";
import { ChevronDown, Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { authClient } from "@/lib/auth/auth-client";
import { useState } from "react";

type NavItem =
  | {
      to: LinkProps["to"];
      text: string;
    }
  | {
      to: LinkProps["to"];
      text: string;
      children?: {
        to: LinkProps["to"];
        text: string;
        subtext?: string;
      }[];
    };

const navItems = [
  {
    text: "Home",
    to: "/",
  },
  {
    children: [
      {
        text: "About us",
        to: "/company/about",
        subtext: "Our story & mission",
      },
      {
        text: "Awards",
        to: "/company/awards",
        subtext: "Recognition & licenses",
      },
      {
        text: "News",
        to: "/company/news",
        subtext: "Latest updates",
      },
    ],
    text: "Company",
    to: "/company",
  },
  {
    children: [
      {
        text: "Account types",
        to: "/trading/accounts",
        subtext: "Micro. Pro. SyntX",
      },
      {
        text: "Instruments",
        to: "/trading/instruments",
        subtext: "Forex, Crypto, Stocks",
      },
      {
        text: "SyntX Indecies",
        to: "/trading/syntx",
        subtext: "Trade 24/7 synthetics",
      },
      {
        text: "MT4/MT5",
        to: "/trading/platforms",
        subtext: "Platform downloads",
      },
    ],
    text: "Trading",
    to: "/trading",
  },
  {
    children: [
      {
        text: "IB Program",
        to: "/partnership/ib",
        subtext: "Introduce clients",
      },
      {
        text: "Affiliate",
        to: "/partnership/affiliate",
        subtext: "Earn commissions",
      },
    ],
    text: "Pertnership",
    to: "/partnership",
  },
  {
    text: "Tool",
    to: "/tools",
  },
] satisfies NavItem[];

export default function Navbar({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      className={cn(
        `default-padding @container/navbar relative z-50`,
        `flex w-full min-w-0 items-center justify-between`,
        `gap-2 py-3`,
        `@sm/navbar:gap-3 @sm/navbar:py-4`,
        className,
      )}
      {...props}
    >
      {/* LOGO */}
      <Button asChild variant="ghost" className={cn(`h-auto shrink-0 px-0`)}>
        <Link
          to="/"
          className={cn(
            `flex min-w-0 items-center justify-start gap-2`,
            `@sm/navbar:gap-3`,
          )}
        >
          <span className={cn(`shrink-0`)}>
            <LogoIconFilled className={cn(`size-9`, `@sm/navbar:size-10`)} />
          </span>

          <span
            className={cn(
              `font-brand-primary font-semibold whitespace-nowrap`,
              `hidden`,
              `@sm/navbar:inline`,
              `@lg/navbar:hidden`,
              `@xl/navbar:inline`,
            )}
          >
            AI Mine Hub
          </span>
        </Link>
      </Button>

      {/* DESKTOP NAV */}
      <LargeScreenNavItemList />

      {/* RIGHT SIDE */}
      <div
        className={cn(
          `ml-auto flex shrink-0 items-center gap-2`,
          `@sm/navbar:gap-3`,
        )}
      >
        <LargeScreenNavCTA />

        <HamburgerButton />
      </div>

      {/* MOBILE NAV */}
      <MobileNav />
    </nav>
  );
}

function LargeScreenNavCTA({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const location = useLocation();
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <Button
        variant="ghost"
        corner="rounded"
        className={cn(`hidden`, `@lg/navbar:inline-flex`, className)}
        asChild
      >
        <span>Loading...</span>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant="primary"
      corner="circle"
      className={cn(`hidden`, `@lg/navbar:inline-flex`, className)}
      {...props}
    >
      {data ? (
        <Link to="/dashboard">Dashboard</Link>
      ) : (
        <Link
          to="/signin"
          search={{
            redirectUrl: location.pathname,
          }}
        >
          Sign in
        </Link>
      )}
    </Button>
  );
}

function HamburgerButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const { toggleNavBar, isNavOpen } = useNavbarState();

  return (
    <Button
      className={cn(
        `flex size-10 shrink-0 items-center justify-center p-0`,
        `@lg/navbar:hidden`,
        className,
      )}
      {...props}
      variant="ghost"
      corner="rounded"
      onClick={toggleNavBar}
      aria-label={isNavOpen ? "Close menu" : "Open menu"}
    >
      {isNavOpen ? (
        <X className={cn(`size-7 text-foreground`)} />
      ) : (
        <Menu className={cn(`size-7 text-foreground`)} />
      )}
    </Button>
  );
}

function MobileNav() {
  const { isNavOpen, toggleNavBar } = useNavbarState();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (text: string) => {
    setOpenDropdown((prev) => (prev === text ? null : text));
  };

  return (
    <div
      className={cn(
        `absolute top-full right-0 left-0 z-50`,
        `border-secondary-200/20 border-t`,
        `bg-background`,
        `transition-all duration-300`,
        `@lg/navbar:hidden`,
        isNavOpen
          ? `visible translate-y-0 opacity-100`
          : `pointer-events-none invisible -translate-y-2 opacity-0`,
      )}
    >
      <div
        className={cn(
          `default-padding flex max-h-[80vh] flex-col`,
          `gap-2 overflow-y-auto py-5`,
        )}
      >
        {navItems.map(({ text, to, children }) => {
          const hasChildren = children && children.length > 0;
          const isOpen = openDropdown === text;

          return (
            <div key={text} className={cn(`w-full`)}>
              {/* NORMAL LINK */}
              {!hasChildren && (
                <Link
                  to={to}
                  onClick={toggleNavBar}
                  className={cn(
                    `font-brand-primary flex w-full items-center`,
                    `rounded-lg px-4 py-3`,
                    `text-foreground`,
                    `transition-colors`,
                    `hover:bg-secondary-500/10`,
                    `hover:text-secondary-500`,
                  )}
                >
                  {text}
                </Link>
              )}

              {/* DROPDOWN BUTTON */}
              {hasChildren && (
                <button
                  type="button"
                  onClick={() => toggleDropdown(text)}
                  className={cn(
                    `font-brand-primary flex w-full items-center justify-between`,
                    `rounded-lg px-4 py-3`,
                    `text-foreground`,
                    `transition-colors`,
                    `hover:bg-secondary-500/10`,
                    `hover:text-secondary-500`,
                  )}
                >
                  <span>{text}</span>

                  <ChevronDown
                    className={cn(
                      `size-4 transition-transform duration-300`,
                      isOpen && `rotate-180`,
                    )}
                  />
                </button>
              )}

              {/* DROPDOWN CONTENT */}
              {hasChildren && (
                <div
                  className={cn(
                    `grid overflow-hidden transition-all duration-300`,
                    isOpen
                      ? `grid-rows-[1fr] opacity-100`
                      : `grid-rows-[0fr] opacity-0`,
                  )}
                >
                  <div className={cn(`min-h-0`)}>
                    <div
                      className={cn(
                        `ml-4 flex flex-col gap-1`,
                        `border-secondary-200/20 border-l`,
                        `py-1 pl-3`,
                      )}
                    >
                      {children.map(({ text, to, subtext }) => (
                        <Link
                          key={text}
                          to={to}
                          onClick={toggleNavBar}
                          className={cn(
                            `rounded-lg px-4 py-2.5`,
                            `transition-colors`,
                            `hover:bg-secondary-500/10`,
                          )}
                        >
                          <p
                            className={cn(
                              `font-brand-primary text-sm`,
                              `text-foreground`,
                            )}
                          >
                            {text}
                          </p>

                          {subtext && (
                            <p
                              className={cn(
                                `font-brand-primary mt-0.5 text-xs`,
                                `text-foreground/50`,
                              )}
                            >
                              {subtext}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <MobileNavCTA />
      </div>
    </div>
  );
}

function MobileNavCTA() {
  const location = useLocation();
  const { data, isPending } = authClient.useSession();
  const { toggleNavBar } = useNavbarState();

  if (isPending) {
    return (
      <Button variant="primary" corner="circle" className={cn(`mt-3 w-full`)}>
        Loading...
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant="primary"
      corner="circle"
      className={cn(`mt-3 w-full`)}
    >
      {data ? (
        <Link to="/dashboard" onClick={toggleNavBar}>
          Dashboard
        </Link>
      ) : (
        <Link
          to="/signin"
          search={{
            redirectUrl: location.pathname,
          }}
          onClick={toggleNavBar}
        >
          Sign in
        </Link>
      )}
    </Button>
  );
}

function LargeScreenNavItemList({
  className,
  ...props
}: ComponentProps<typeof NavigationMenu>) {
  return (
    <NavigationMenu
      viewport={false}
      className={cn(
        `relative z-9999 hidden min-w-0`,
        `@lg/navbar:flex`,
        className,
      )}
      {...props}
    >
      <NavigationMenuList
        className={cn(`flex min-w-0 items-center gap-0`, `@xl/navbar:gap-1`)}
      >
        {navItems.map(({ text, children, to }) => {
          return (
            <NavigationMenuItem key={text}>
              {children && children.length > 0 && (
                <>
                  <NavigationMenuTrigger className={cn(`px-0`)}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={to}
                        className={cn(
                          `group/nav-item flex flex-row items-center gap-x-1`,
                          `rounded-md px-2`,
                          `font-brand-primary`,
                          `transition-colors`,
                          `hover:bg-secondary-500/10`,
                          `hover:text-secondary-500`,
                          `@xl/navbar:px-3`,
                          `@2xl/navbar:px-4`,
                        )}
                        tabIndex={-1}
                      >
                        <span className={cn(`whitespace-nowrap`)}>{text}</span>

                        <ChevronDown
                          className={cn(
                            `size-4 shrink-0`,
                            `transition-transform`,
                            `group-hover/nav-item:rotate-180`,
                          )}
                        />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent
                    className={cn(
                      `min-w-max rounded-md`,
                      `shadow-secondary-500/20`,
                      `group-data-[viewport=false]/navigation-menu:border-secondary-500/15`,
                    )}
                  >
                    <ul
                      className={cn(`relative flex min-w-60 flex-col gap-y-2`)}
                    >
                      {children.map(({ text, to, subtext }) => {
                        return (
                          <li key={text}>
                            <Button
                              asChild
                              corner="rounded"
                              variant="ghost"
                              className={cn(
                                `h-14 w-full items-start`,
                                `border border-transparent`,
                                `bg-transparent px-2 text-left`,
                                `hover:border-secondary-500/10`,
                                `hover:bg-secondary-500/5`,
                              )}
                            >
                              <Link
                                to={to}
                                className={cn(`flex flex-col gap-y-1`)}
                              >
                                <span className={cn(`text-foreground`)}>
                                  {text}
                                </span>

                                <span className={cn(`fs-3 text-foreground/60`)}>
                                  {subtext}
                                </span>
                              </Link>
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </>
              )}

              {!children && (
                <NavigationMenuLink asChild>
                  <Link
                    to={to}
                    className={cn(
                      `rounded-sm px-2`,
                      `font-brand-primary`,
                      `transition-colors`,
                      `hover:bg-secondary-500/10`,
                      `hover:text-secondary-500`,
                      `@xl/navbar:px-3`,
                      `@2xl/navbar:px-4`,
                    )}
                  >
                    {text}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
