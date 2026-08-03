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
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { authClient } from "@/lib/auth/auth-client";

type NavItem =
  | { to: LinkProps["to"]; text: string }
  | {
      to: LinkProps["to"];
      text: string;
      children?: { to: LinkProps["to"]; text: string; subtext?: string }[];
    };

const navItems = [
  { text: "Home", to: "/" },
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
      { text: "News", to: "/company/news", subtext: "Latest updates" },
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
    text: "Trading  ",
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
        `default-padding flex w-full items-center justify-between py-4`,
        className,
      )}
      {...props}
    >
      <Button asChild variant={"ghost"} className={cn(`px-0`)}>
        <Link to="/" className={cn(`flex items-center justify-start gap-3`)}>
          <span>
            <LogoIconFilled className={cn(`size-10`)} />
          </span>
          <span className={cn(`fs-5.5 font-semibold lg:hidden xl:inline`)}>
            AI Mine Hub
          </span>
        </Link>
      </Button>

      <LargeScreenNavItemList />

      <LargeScreenNavCTA />

      <HamburgerButton />
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
        variant={"primary"}
        corner={"rounded"}
        className={cn(`max-lg:hidden`, className)}
      >
        Loading...
      </Button>
    );
  }

  return (
    <Button
      asChild={!isPending}
      variant={"primary"}
      corner={"circle"}
      className={cn(`max-lg:hidden`, className)}
      {...props}
    >
      {data ? (
        <Link to="/dashboard">Dashboard</Link>
      ) : (
        <Link to="/signin" search={{ redirectUrl: location.pathname }}>
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

  useGSAP(
    () => {
      const gsapHamburgerButton = document.getElementById(
        "gsap-hamburger-button",
      );

      if (!gsapHamburgerButton) return;

      const gsapHamburgerButtonChildren = Array.from(
        gsapHamburgerButton.children,
      );

      if (isNavOpen) {
        gsap.to(gsapHamburgerButtonChildren[0], {
          ease: "back",
          rotateZ: "35deg",
        });
        gsap.to(gsapHamburgerButtonChildren[1], {
          opacity: 0,
        });
        gsap.to(gsapHamburgerButtonChildren[2], {
          ease: "back",
          rotateZ: "-35deg",
        });
      } else {
        gsap.to(gsapHamburgerButtonChildren[0], {
          rotateZ: "0deg",
        });
        gsap.to(gsapHamburgerButtonChildren[1], {
          opacity: 1,
        });
        gsap.to(gsapHamburgerButtonChildren[2], {
          ease: "back",
          rotateZ: "0deg",
        });
      }
    },
    { dependencies: [isNavOpen] },
  );

  return (
    <Button
      className={cn(`flex flex-col px-2 duration-150 lg:hidden`, className)}
      {...props}
      variant={"ghost"}
      corner={"rounded"}
      id={`gsap-hamburger-button`}
      onClick={toggleNavBar}
    >
      <span
        className={cn(
          `inline-block h-0.75 w-8 origin-top-left rounded-full bg-white`,
        )}
      />
      <span className={cn(`inline-block h-0.75 w-8 rounded-full bg-white`)} />
      <span
        className={cn(
          `inline-block h-0.75 w-8 origin-top-left rounded-full bg-white`,
        )}
      />
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
      className={cn(`relative z-9999 max-lg:hidden`, className)}
      {...props}
    >
      <NavigationMenuList>
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
                          `group/nav-item hover:bg-secondary-500/10 hover:text-secondary-500 flex flex-row items-center gap-x-1 rounded-md px-4`,
                        )}
                        tabIndex={-1}
                      >
                        <span>{text}</span>
                        <span>
                          <ChevronDown
                            className={cn(
                              `transition-transform group-hover/nav-item:rotate-180`,
                            )}
                          />
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent
                    className={cn(
                      `shadow-secondary-500/20 min-w-max rounded-md`,
                      `group-data-[viewport=false]/navigation-menu:border-secondary-500/15`,
                    )}
                  >
                    <ul
                      className={cn(`relative flex min-w-60 flex-col gap-y-2`)}
                    >
                      {/* eslint-disable-next-line no-shadow */}
                      {children.map(({ text, to, subtext }) => {
                        return (
                          <li key={text}>
                            <Button
                              asChild
                              corner={"rounded"}
                              variant={"ghost"}
                              className={cn(
                                `hover:border-secondary-500/10 hover:bg-secondary-500/5 h-14 w-full items-start border border-transparent bg-transparent px-2 text-left`,
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
                      `hover:bg-secondary-500/10 hover:text-secondary-500 rounded-sm px-4`,
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
