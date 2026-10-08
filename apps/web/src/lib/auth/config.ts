import { betterAuth } from "better-auth";
import { env } from "@repo/env/server";

/**
 * Indicates whether the application is running in production.
 *
 * Production authentication uses secure cookies and `SameSite=None`
 * to support authentication across different origins.
 */
const isProd = process.env.NODE_ENV === "production";

/**
 * Better Auth configuration for the web application.
 *
 * Authentication is configured with:
 *
 * - A canonical application URL from `WEB_APP_HOST`.
 * - A server-side secret used to sign and protect authentication data.
 * - A 7-day JWT-based session cookie cache with automatic refresh.
 * - Google as a social authentication provider.
 * - Secure, HTTP-only cookies in production.
 * - Cross-site cookies in production via `SameSite=None`.
 *
 * In development, cookies use `SameSite=Lax` and do not require HTTPS,
 * which makes local development easier.
 *
 * @see https://www.better-auth.com/
 */
export const auth = betterAuth({
  /**
   * Base URL used by Better Auth for authentication endpoints,
   * OAuth callbacks, and other generated URLs.
   */
  baseURL: env.WEB_APP_HOST,

  /**
   * Secret used by Better Auth for signing and protecting
   * authentication-related data.
   *
   * This value must be kept server-side and should be sufficiently
   * long and unpredictable.
   */
  secret: env.BETTER_AUTH_SECRET,

  /**
   * Session configuration.
   *
   * The cookie cache stores session information using a JWT strategy.
   * Cached sessions are valid for 7 days and are refreshed when used.
   */
  session: {
    cookieCache: {
      enabled: true,

      /**
       * Maximum cache lifetime: 7 days, expressed in seconds.
       */
      maxAge: 7 * 24 * 60 * 60,

      /**
       * Store the cached session using a JWT.
       */
      strategy: "jwt",

      /**
       * Refresh the cached session when it is accessed.
       */
      refreshCache: true,
    },
  },

  /**
   * OAuth/social authentication providers.
   */
  socialProviders: {
    google: {
      /**
       * Google OAuth client identifier.
       */
      clientId: env.GOOGLE_CLIENT_ID,

      /**
       * Google OAuth client secret.
       *
       * This must remain server-side and must never be exposed
       * to the browser.
       */
      clientSecret: env.GOOGLE_CLIENT_SECRET,

      /**
       * OAuth callback endpoint registered with Google.
       */
      redirectURI: `${env.WEB_APP_HOST}/api/auth/callback/google`,
    },
  },

  /**
   * Advanced cookie configuration.
   *
   * Development uses non-secure, `SameSite=Lax` cookies.
   * Production uses secure, HTTP-only cookies with `SameSite=None`
   * so that authentication can work across different origins.
   */
  advanced: {
    /**
     * Only require HTTPS for authentication cookies in production.
     */
    useSecureCookies: isProd,

    /**
     * Default attributes applied to Better Auth cookies.
     */
    defaultCookieAttributes: {
      /**
       * Allow cross-site cookie usage in production.
       *
       * `SameSite=None` requires `Secure`, which is why both
       * settings are enabled together in production.
       */
      sameSite: isProd ? "none" : "lax",

      /**
       * Prevent client-side JavaScript from accessing the cookie.
       */
      secure: isProd,

      /**
       * Restrict cookie access to HTTP requests.
       */
      httpOnly: true,

      /**
       * Share the cookie across the configured domain in production.
       */
      ...(isProd && {
        domain: env.WEB_APP_HOST.split("://")[1],
      }),

      /**
       * Make the cookie available to all application paths.
       */
      path: "/",
    },
  },
});
