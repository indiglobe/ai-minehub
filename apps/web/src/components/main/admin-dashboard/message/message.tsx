import { useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import { MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@repo/ui/button";
import {
  ConversationsError,
  ConversationsLoading,
} from "@/components/main/admin-dashboard/message/boundary-comps";

export function Conversations({
  className,
  ...props
}: ComponentProps<"section">) {
  const conversations = [
    {
      id: "conv-1",
      user: {
        name: "dimitriy dimitriy",
        email: "dimitriy.livanov@mail.ru",
      },
      traderId: "WT-5S2N3H55",
      lastMessage: "Yes",
      updated: "3 weeks ago",
    },
    {
      id: "conv-2",
      user: {
        name: "Shanu Mridha",
        email: "mridhashanu240420@gmail.com",
      },
      traderId: "WT-TGTOXVTI",
      lastMessage: "How do I withdraw funds?",
      updated: "2 months ago",
    },
    {
      id: "conv-3",
      user: {
        name: "Vladimir Grigorenko",
        email: "mhummock@mail.ru",
      },
      traderId: "WT-UVEYGTAA",
      lastMessage: "I need help with KYC verification",
      updated: "4 months ago",
    },
    {
      id: "conv-4",
      user: {
        name: "Tatai Manna",
        email: "rataimanna013@gmail.com",
      },
      traderId: "WT-OLPNEM33",
      lastMessage: "How do I deposit funds?",
      updated: "5 months ago",
    },
    {
      id: "conv-5",
      user: {
        name: "dsfsd dsfsf",
        email: "birthday@yzcalo.com",
      },
      traderId: "WT-TW5YDOF8",
      lastMessage: "—",
      updated: "—",
    },
    {
      id: "conv-6",
      user: {
        name: "Surajit Sarder",
        email: "surajitsarder2000@gmail.com",
      },
      traderId: "WT-KGZJGTEO",
      lastMessage: "—",
      updated: "—",
    },
    {
      id: "conv-7",
      user: {
        name: "aaa aaa",
        email: "7689894@mail.ru",
      },
      traderId: "WT-RBDMISRT",
      lastMessage: "—",
      updated: "—",
    },
    {
      id: "conv-8",
      user: {
        name: "Joy Bj",
        email: "joy003@gmail.com",
      },
      traderId: "WT-9CRHKVGA",
      lastMessage: "—",
      updated: "—",
    },
    {
      id: "conv-9",
      user: {
        name: "Deep Ranadip Naskar",
        email: "dipn57374@gmail.com",
      },
      traderId: "WT-Q8JSCSAD",
      lastMessage: "—",
      updated: "—",
    },
  ];

  const [state] = useState<"error" | "loading" | "data">("data");
  // const [state] = useState<"error" | "loading" | "data">("loading");
  // const [state] = useState<"error" | "loading" | "data">("error");

  return (
    <section
      className={cn(`default-padding @container py-10`, className)}
      {...props}
    >
      <div
        className={cn(
          `bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4`,
        )}
      >
        <div
          className={cn(
            `flex w-full flex-col gap-2 @md:flex-row @md:items-center @md:justify-between`,
          )}
        >
          <div className={cn(`flex items-center gap-2`)}>
            <MessageSquare className={cn(`text-secondary-500 size-4`)} />
            <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
              Conversations
            </h2>
          </div>

          <p className={cn(`text-foreground/50 text-xs`)}>
            New user messages appear here in real time when you open a thread.
          </p>
        </div>

        <hr className={cn(`border-foreground/20 -mx-6 my-4`)} />

        {state === "error" && <ConversationsError></ConversationsError>}
        {state === "loading" && <ConversationsLoading></ConversationsLoading>}
        {state === "data" && (
          <div className={cn(`overflow-x-auto`)}>
            <table className={cn(`w-full border-collapse text-left`)}>
              <thead>
                <tr
                  className={cn(
                    `text-foreground/50 text-2.75 tracking-wider uppercase`,
                  )}
                >
                  <th className={cn(`py-3 font-medium`)}>User</th>
                  <th className={cn(`py-3 font-medium`)}>Trader ID</th>
                  <th className={cn(`py-3 font-medium`)}>Last Message</th>
                  <th className={cn(`py-3 font-medium`)}>Updated</th>
                  <th className={cn(`py-3 text-right font-medium`)}>Actions</th>
                </tr>
              </thead>
              <tbody className={cn(`divide-foreground/10 divide-y text-sm`)}>
                {conversations.map((item) => (
                  <tr key={item.id} className={cn(`group`)}>
                    <td className={cn(`py-4 pr-4`)}>
                      <div className={cn(`flex flex-col`)}>
                        <span className={cn(`text-foreground font-medium`)}>
                          {item.user.name}
                        </span>
                        <span className={cn(`text-foreground/50 text-xs`)}>
                          {item.user.email}
                        </span>
                      </div>
                    </td>
                    <td
                      className={cn(
                        `text-foreground/80 py-4 pr-4 font-mono text-xs`,
                      )}
                    >
                      {item.traderId}
                    </td>
                    <td className={cn(`text-foreground/80 py-4 pr-4 text-xs`)}>
                      {item.lastMessage}
                    </td>
                    <td className={cn(`text-foreground/60 py-4 pr-4 text-xs`)}>
                      {item.updated}
                    </td>
                    <td className={cn(`py-4 text-right`)}>
                      <Button
                        size="sm"
                        className={cn(
                          `h-8 gap-1.5 rounded-lg bg-blue-600 px-4 text-xs text-white hover:bg-blue-700`,
                        )}
                      >
                        Open
                        <ArrowRight className={cn(`size-3.5`)} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
