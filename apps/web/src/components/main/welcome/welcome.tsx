import { cn } from "@repo/styles/cn";
import Main from "../main";
import type { ComponentProps } from "react";
import { Button } from "@repo/ui/button";
import { ArrowLeft } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import {
  useLoaderData,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import { welcomeFormSchema } from "@repo/utils/zod-schema/form-schema/welcome-form";
import type { TWelcomeFormSchema } from "@repo/utils/zod-schema/form-schema/welcome-form";
import { useServerFn } from "@tanstack/react-start";
import { serverFn__createUser } from "@/integrations/server-function/user";

export function WelcomeComp({ ...props }: ComponentProps<typeof Main>) {
  return (
    <Main
      className={cn(
        `from-background via-primary-50 to-accent-50 dark:from-background mt-0 bg-linear-to-br dark:via-zinc-900 dark:to-zinc-800`,
      )}
      {...props}
    >
      <section
        className={cn(
          `relative flex min-h-screen flex-col justify-center px-6 py-12 sm:py-16 md:px-10`,
          props.className,
        )}
      >
        {/* Back Button */}
        <div
          className={cn(`absolute top-4 left-4 sm:top-6 sm:left-6 md:left-10`)}
        >
          <Button
            variant={`ghost`}
            onClick={() => window.history.back()}
            className={cn(
              `text-primary-500 hover:text-primary-400 hover:bg-primary-500/10`,
            )}
          >
            <ArrowLeft className={cn(`size-6 sm:size-7`)} />
          </Button>
        </div>

        {/* Background Glow */}
        <div
          className={cn(
            `pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-primary-400),transparent)] opacity-20`,
          )}
        />

        <div
          className={cn(
            `relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12`,
          )}
        >
          {/* Left */}
          <div
            className={cn(
              `flex flex-col items-center gap-6 text-center lg:items-start lg:text-left`,
            )}
          >
            <h1
              className={cn(
                `text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl`,
              )}
            >
              <span className={cn(`text-zinc-800 dark:text-white`)}>
                Welcome to
              </span>
              <br />
              <span
                className={cn(
                  `from-primary-500 to-accent-500 bg-linear-to-r bg-clip-text text-transparent`,
                )}
              >
                Ai Mine Hub
              </span>
            </h1>

            <p
              className={cn(
                `max-w-md text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400`,
              )}
            >
              Complete your profile to get started. This information helps us
              personalize your experience and prepare your account.
            </p>
          </div>

          {/* Right */}
          <div className={cn(`flex justify-center`)}>
            <div
              className={cn(
                `flex w-full max-w-md flex-col gap-6 rounded-2xl border border-zinc-200/60 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:border-zinc-700/60 dark:bg-zinc-900/70`,
              )}
            >
              <div className={cn(`text-center`)}>
                <h2 className={cn(`text-primary-500 text-2xl font-bold`)}>
                  Complete Your Profile
                </h2>

                <p
                  className={cn(
                    `mt-2 text-sm text-zinc-600 dark:text-zinc-400`,
                  )}
                >
                  Please fill in the details below.
                </p>
              </div>

              <WelcomeForm />

              <p className={cn(`text-center text-xs text-zinc-400`)}>
                By continuing, you agree to complete your account setup.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
}

export function WelcomeForm({ className, ...props }: ComponentProps<"form">) {
  const {
    session: {
      user: { email, image },
    },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(new-user)/welcome/",
  });
  const { referralCode } = useLoaderData({
    from: "/(without-header-footer)/(authenticated)/(new-user)/welcome/",
  });
  const createUser = useServerFn(serverFn__createUser);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      phoneNo: 0,
      age: 0,
      referralCode: referralCode.toUpperCase(),
      email,
    } satisfies TWelcomeFormSchema,
    validators: {
      onSubmit: welcomeFormSchema,
    },
    onSubmit: async ({ value }) => {
      // eslint-disable-next-line no-shadow
      const { age, email, name, phoneNo, referralCode } = value;

      await createUser({
        data: {
          age,
          email,
          fullName: name,
          phoneNumber: phoneNo.toString(),
          referrerId: referralCode.length > 0 ? referralCode : null,
          avatarUrl: image ?? "",
        },
      });

      navigate({ to: "/dashboard" });

      return;
    },
  });

  return (
    <form
      className={cn(`space-y-5`, className)}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      {...props}
    >
      <form.Field
        name="name"
        children={(field) => (
          <div>
            <label className={cn(`mb-2 block text-sm font-medium`)}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(
                `focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:ring-4 dark:border-zinc-700`,
              )}
            />
          </div>
        )}
      />

      <form.Field
        name="email"
        children={(field) => (
          <div>
            <label className={cn(`mb-2 block text-sm font-medium`)}>
              Email Address
            </label>
            <input
              type="email"
              disabled
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(
                `focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:ring-4 dark:border-zinc-700`,
                `disabled:cursor-not-allowed disabled:opacity-50`,
              )}
            />
          </div>
        )}
      />

      <form.Field
        name="phoneNo"
        children={(field) => (
          <div>
            <label className={cn(`mb-2 block text-sm font-medium`)}>
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="9876543210"
              value={field.state.value || ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(Number(e.target.value) || 0)}
              className={cn(
                `focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:ring-4 dark:border-zinc-700`,
              )}
            />
          </div>
        )}
      />

      <form.Field
        name="age"
        children={(field) => (
          <div>
            <label className={cn(`mb-2 block text-sm font-medium`)}>Age</label>
            <input
              type="number"
              min={0}
              value={field.state.value || ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(Number(e.target.value) || 0)}
              className={cn(
                `focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:ring-4 dark:border-zinc-700`,
              )}
            />
          </div>
        )}
      />

      <form.Field
        name="referralCode"
        children={(field) => (
          <div>
            <label className={cn(`mb-2 block text-sm font-medium`)}>
              Referral Code
            </label>
            <input
              type="text"
              placeholder="Optional"
              value={field.state.value}
              onBlur={field.handleBlur}
              disabled={field.state.value.length > 0}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(
                `focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-xl border border-zinc-300 bg-transparent px-4 py-3 outline-none focus:ring-4 dark:border-zinc-700`,
                `disabled:cursor-not-allowed disabled:opacity-50`,
              )}
            />
          </div>
        )}
      />

      <Button type="submit" className={cn(`w-full`)} corner="rounded">
        Continue
      </Button>
    </form>
  );
}
