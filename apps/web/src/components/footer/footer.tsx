import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import { LogoIconFilled } from "@repo/ui/logo";
import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import type { ComponentProps } from "react";
import { Facebook, Instagram, Telegram, Twitter, YouTube } from "@repo/ui/svg";

export function Footer({ className, ...props }: ComponentProps<"footer">) {
  return (
    <footer className={cn(`default-padding pt-16 pb-10`, className)} {...props}>
      <section
        className={cn(
          `grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6`,
        )}
      >
        <div className={cn(`col-span-1 space-y-5 sm:col-span-2`)}>
          <Link to="/" className={cn(`flex items-center justify-start gap-3`)}>
            <LogoIconFilled className={cn(`h-10 w-10`)} />
            <span className={cn(`fs-5.5 font-semibold`)}>AI Mine Hub</span>
          </Link>
          <p className={cn(`text-primary-950/70 fs-3.5`)}>
            Professional trading conditions for every trader. Access the world's
            markets with institutional-grade technology, tight spreads, and 24/7
            support.
          </p>
          <p className={cn(`flex items-start gap-2`)}>
            <MapPin className={cn(`text-secondary-500 mt-0.5 size-4`)} />
            <span className={cn(`fs-3.5`)}>
              403, Building 6, Bay Square, Business Bay, Dubai, UAE. P.O. Box -
              242644.
            </span>
          </p>
          <p className={cn(`flex items-start gap-2`)}>
            <Mail className={cn(`text-secondary-500 mt-1 size-4`)} />
            <a href="mailto:contact@aiminehub.com">contact@aiminehub.com</a>
          </p>
          <div className={cn(`flex gap-2`)}>
            <a
              href=""
              className={cn(
                `bg-primary-950/5 group border-secondary-700/40 hover:border-secondary-500 relative flex rounded-lg border p-2 transition-all hover:-translate-y-0.5`,
              )}
            >
              <Twitter
                className={cn(
                  `fill-secondary-700/40 group-hover:fill-secondary-500 size-5 transition-colors`,
                )}
              />
            </a>
            <a
              href=""
              className={cn(
                `bg-primary-950/5 group border-secondary-700/40 hover:border-secondary-500 relative flex rounded-lg border p-2 transition-all hover:-translate-y-0.5`,
              )}
            >
              <Telegram
                className={cn(
                  `fill-secondary-700/40 group-hover:fill-secondary-500 size-5 transition-colors`,
                )}
              />
            </a>
            <a
              href=""
              className={cn(
                `bg-primary-950/5 group border-secondary-700/40 hover:border-secondary-500 relative flex rounded-lg border p-2 transition-all hover:-translate-y-0.5`,
              )}
            >
              <Instagram
                className={cn(
                  `fill-secondary-700/40 group-hover:fill-secondary-500 size-5 transition-colors`,
                )}
              />
            </a>
            <a
              href=""
              className={cn(
                `bg-primary-950/5 group border-secondary-700/40 hover:border-secondary-500 relative flex rounded-lg border p-2 transition-all hover:-translate-y-0.5`,
              )}
            >
              <Facebook
                className={cn(
                  `fill-secondary-700/40 group-hover:fill-secondary-500 size-5 transition-colors`,
                )}
              />
            </a>
            <a
              href=""
              className={cn(
                `bg-primary-950/5 group border-secondary-700/40 hover:border-secondary-500 relative flex rounded-lg border p-2 transition-all hover:-translate-y-0.5`,
              )}
            >
              <YouTube
                className={cn(
                  `fill-secondary-700/40 group-hover:fill-secondary-500 size-5 transition-colors`,
                )}
              />
            </a>
          </div>
        </div>

        <div>
          <FooterLinkHeading>Trading</FooterLinkHeading>
          <ul className={cn(`space-y-1`)}>
            <li>
              <FooterLink to="/trading/accounts">Account Types</FooterLink>
            </li>
            <li>
              <FooterLink to="/trading/instruments">Forex Trading</FooterLink>
            </li>
            <li>
              <FooterLink to="/trading/instruments">Crypto CFDs</FooterLink>
            </li>
            <li>
              <FooterLink to="/trading/syntx">SyntX Indices</FooterLink>
            </li>
            <li>
              <FooterLink to="/trading/instruments">Stocks</FooterLink>
            </li>
            <li>
              <FooterLink to="/trading/instruments">Commodities</FooterLink>
            </li>
          </ul>
        </div>

        <div>
          <FooterLinkHeading>Platforms</FooterLinkHeading>
          <ul className={cn(`space-y-1`)}>
            <li>
              <FooterLink to="/trading/platforms">MetaTrader 4</FooterLink>
            </li>
            <li>
              <FooterLink to="/trading/platforms">MetaTrader 5</FooterLink>
            </li>
            <li>
              <FooterLink to="/trading/platforms">Web Trader</FooterLink>
            </li>
            <li>
              <FooterLink to="/trading/platforms">Mobile App</FooterLink>
            </li>
            <li>
              <FooterLink to="/trading/platforms">Copy Trading</FooterLink>
            </li>
          </ul>
        </div>

        <div>
          <FooterLinkHeading>Company</FooterLinkHeading>
          <ul className={cn(`space-y-1`)}>
            <li>
              <FooterLink to="/company/about">About Us</FooterLink>
            </li>
            <li>
              <FooterLink to="/company/news">News</FooterLink>
            </li>
            <li>
              <FooterLink to="/company/about">Awards</FooterLink>
            </li>
            <li>
              <FooterLink to="/partnership/ib">Partnership</FooterLink>
            </li>
            <li>
              <FooterLink to="/partnership/affiliate">Affiliate</FooterLink>
            </li>
            <li>
              <FooterLink to="/company/about">Careers</FooterLink>
            </li>
          </ul>
        </div>

        <div>
          <FooterLinkHeading>Support</FooterLinkHeading>
          <ul className={cn(`space-y-1`)}>
            <li>
              <FooterLink to="/">Live Chat</FooterLink>
            </li>
            <li>
              <a
                href="mailto:contact@aiminehub.com"
                className={cn(
                  `text-primary-950/50 fs-3.5 hover:text-primary-950 transition-colors`,
                )}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <FooterLinkHeading>Newsletter</FooterLinkHeading>
        </div>
      </section>

      <hr
        className={cn(
          `text-primary-950/10 -mx-4 py-2 md:-mx-10 lg:-mx-14 xl:-mx-18`,
        )}
      />

      <section
        className={cn(
          `text-primary-950/50 fs-3 flex w-full flex-col items-center justify-center space-y-4 max-lg:m-auto max-lg:max-w-150 lg:basis-1/2 lg:flex-row`,
        )}
      >
        <div className={cn(`text-center lg:basis-1/2 lg:text-left`)}>
          <p>&copy; 2026 AI Mine Hub. All rights reserved.</p>
          <p>
            <strong>Risk Warning:</strong> CFDs are complex instruments and
            carry a high risk of losing money rapidly due to leverage. 76% of
            retail investor accounts lose money. Please ensure you understand
            the risks.
          </p>
        </div>
        <div className={cn(`lg:basis-1/2`)}>
          <ul
            className={cn(
              `flex w-full flex-wrap items-center justify-center gap-4 lg:justify-end`,
            )}
          >
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service">Terms of Service</Link>
            </li>
            <li>
              <Link to="/cookie-policy">Cookie Policy</Link>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
}

function FooterLinkHeading({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        `fs-3.5 inline-block pb-4 font-semibold uppercase`,
        className,
      )}
      {...props}
    />
  );
}

function FooterLink({
  className,
  to,
  ...props
}: ComponentProps<typeof Link> & { to: LinkProps["to"] }) {
  return (
    <Button asChild variant={"ghost"} className={cn(`h-6 px-0`)}>
      <Link
        className={cn(
          `text-primary-950/50 fs-3.5 hover:text-primary-950 transition-colors`,
          className,
        )}
        {...props}
      />
    </Button>
  );
}
