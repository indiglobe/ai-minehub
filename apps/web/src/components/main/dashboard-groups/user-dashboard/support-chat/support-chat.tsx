import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "@repo/ui/message";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
} from "@repo/ui/avatar";
import { Bubble, BubbleContent } from "@repo/ui/bubble";
import Main from "@/components/main/main";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  NamespaceName,
} from "@repo/types/socket-namespaces/chat";
import { env } from "@repo/env/client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ComponentProps, ReactNode } from "react";
import { useRouteContext } from "@tanstack/react-router";
import { cn } from "@repo/styles/cn";
import {
  ArrowUpRight,
  Coins,
  History,
  Loader2,
  MessageCircle,
  Percent,
  Send,
  ShieldCheck,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { faker } from "@faker-js/faker";
import { useInfiniteReadAllChats } from "@/integrations/tanstack/react-querry/chat/basic";
import { id } from "@repo/utils/id";

const isDevelopment = import.meta.env.MODE === "development";

type LocalMessage = {
  channelId: string;
  message: string;
  senderId: string;
  role: "ADMIN" | "BASIC";
  reciverId?: string | null;
  id: string;
  createdAt: Date;
};

type ChatSocketContextType = {
  chatSocket: Socket<ServerToClientEvents, ClientToServerEvents>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  senderId: string;
  sendMessage: () => void;
  newMessages: LocalMessage[];
  setNewMessages: React.Dispatch<React.SetStateAction<LocalMessage[]>>;
};

const ChatSocketContext = createContext<ChatSocketContextType | null>(null);

function SocketProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState(
    isDevelopment
      ? faker.lorem.sentences({ min: 2, max: 5 }, "\n").slice(0, 1000)
      : "",
  );
  const [channelJoined, setChannelJoined] = useState(false);
  const [newMessages, setNewMessages] = useState<LocalMessage[]>([]);

  const {
    userDetailsFromCookie: { userId, role },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/(basic)/support-chat/",
  });

  const chatSocketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  if (!chatSocketRef.current) {
    chatSocketRef.current = io(
      `${env.VITE_SERVER_APP_HOST}${"/chat" satisfies NamespaceName}`,
      {
        autoConnect: false,
      },
    );
  }

  const joinChannel = () => {
    chatSocketRef.current?.emit("join-channel", {
      channelId: userId,
      senderId: userId,
      role,
    });
  };

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || !channelJoined) return;

    const optimisticMessage: LocalMessage = {
      id: id(),
      channelId: userId,
      message: trimmedMessage,
      senderId: userId,
      role,
      createdAt: new Date(),
    };

    setNewMessages((previous) => [...previous, optimisticMessage]);

    chatSocketRef.current?.emit("send-message", {
      channelId: userId,
      message: trimmedMessage,
      role,
      senderId: userId,
    });

    setMessage(
      isDevelopment
        ? faker.lorem.sentences({ min: 2, max: 5 }, "\n").slice(0, 1000)
        : "",
    );
  };

  useEffect(() => {
    const chatSocket = chatSocketRef.current!;

    const handleChannelJoined = () => {
      setChannelJoined(true);
    };

    const handleNewMessage = (incomingMessage: LocalMessage) => {
      setNewMessages((previous) => {
        if (previous.some((item) => item.id === incomingMessage.id)) {
          return previous;
        }

        return [...previous, incomingMessage];
      });
    };

    chatSocket.on("connect", joinChannel);
    chatSocket.on("channel-joined", handleChannelJoined);
    chatSocket.on("new-message", handleNewMessage);

    chatSocket.connect();

    return () => {
      chatSocket.off("connect", joinChannel);
      chatSocket.off("channel-joined", handleChannelJoined);
      chatSocket.off("new-message", handleNewMessage);

      setChannelJoined(false);

      chatSocket.emit("leave-channel", {
        channelId: userId,
        senderId: userId,
      });

      chatSocket.disconnect();
    };
  }, [userId]);

  return (
    <ChatSocketContext.Provider
      value={{
        chatSocket: chatSocketRef.current,
        senderId: userId,
        message,
        setMessage,
        sendMessage,
        newMessages,
        setNewMessages,
      }}
    >
      {children}
    </ChatSocketContext.Provider>
  );
}

function useSocket() {
  const context = useContext(ChatSocketContext);

  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }

  return context;
}

export function SupportChat() {
  return (
    <Main className="default-padding">
      <SocketProvider>
        <LiveSupportPageHeader />

        <SupportChatInterface />
      </SocketProvider>
    </Main>
  );
}

export function SupportChatInterface({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "default-padding @container mx-auto w-full max-w-5xl py-8",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "bg-secondary-500/5 border-secondary-500/20 overflow-hidden rounded-2xl border",
        )}
      >
        <ChatHeader />

        <MessageList />

        <QuickMessages />

        <MessageInput />

        {/* Footer Branding */}
        <div
          className={cn(
            "text-foreground/40 border-foreground/5 text-2.75 border-t py-2.5 text-center",
          )}
        >
          Powered by <span className="font-semibold">AI Mine Hub</span>
        </div>
      </div>
    </div>
  );
}

function LiveSupportPageHeader({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding @container flex flex-col items-center justify-center py-16 text-center`,
        className,
      )}
      {...props}
    >
      {/* Live Support Badge */}
      <div
        className={cn(
          `border-secondary-500/30 bg-secondary-500/10 mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5`,
        )}
      >
        <span className={cn(`size-2 rounded-full bg-green-500`)} />
        <span
          className={cn(
            `font-brand-accent text-secondary-200 text-xs font-semibold tracking-wider uppercase`,
          )}
        >
          Live Support
        </span>
      </div>

      {/* Main Heading */}
      <h1
        className={cn(
          `font-brand-accent max-w-3xl text-4xl font-bold tracking-tight @md:text-5xl @lg:text-6xl`,
          `from-foreground via-secondary-300 to-secondary-500 bg-linear-to-r bg-clip-text text-transparent`,
        )}
      >
        How can we help you today?
      </h1>

      {/* Subtitle */}
      <p
        className={cn(`text-foreground/60 mt-4 max-w-md text-sm @md:text-base`)}
      >
        Our team is online 24/7. Send a message and we&apos;ll get back to you
        in minutes.
      </p>
    </section>
  );
}

function QuickMessages() {
  const { setMessage } = useSocket();

  const quickActions = [
    { label: "Deposit", icon: Coins },
    { label: "Verification", icon: ShieldCheck },
    { label: "Trading Tools", icon: TrendingUp },
    { label: "Tech Support", icon: Wrench },
    { label: "Fees", icon: Percent },
    { label: "Withdrawal", icon: ArrowUpRight },
  ];

  return (
    <div className="border-foreground/10 bg-background/50 flex flex-wrap items-center gap-2 border-t px-4 py-3 @md:px-6">
      <span className="text-muted-foreground text-2.5 mr-1 font-semibold tracking-wider uppercase">
        Quick topics
      </span>

      {quickActions.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          onClick={() => setMessage(`I need help with ${label.toLowerCase()}.`)}
          className="border-foreground/10 bg-background hover:border-secondary-500/40 hover:bg-secondary-500/5 flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all"
        >
          <Icon className="text-secondary-500 size-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}

function MessageInput() {
  const { message, setMessage, sendMessage } = useSocket();

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage();
  };

  return (
    <div className="border-foreground/10 bg-background border-t p-4 @md:p-5">
      <div className="border-foreground/15 bg-background focus-within:border-secondary-500 focus-within:ring-secondary-500/15 rounded-2xl border p-3 shadow-sm transition-all focus-within:ring-2">
        <textarea
          placeholder="Type your message here..."
          className="text-foreground placeholder:text-foreground/40 max-h-36 min-h-15 w-full resize-none bg-transparent text-sm leading-relaxed outline-none"
          value={message}
          rows={2}
          maxLength={1000}
          onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <div className="flex items-center justify-between pt-2">
          <span className="text-muted-foreground text-2.5">
            Press Enter to send · Shift + Enter for a new line
          </span>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-2.5 tabular-nums">
              {message.length}/1000
            </span>

            <button
              type="button"
              disabled={!message.trim()}
              onClick={handleSend}
              className="bg-secondary-500 text-secondary-50 hover:bg-secondary-600 flex size-9 items-center justify-center rounded-xl transition-all disabled:pointer-events-none disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatHeader() {
  return (
    <div
      className={cn(
        "border-foreground/10 flex flex-col gap-4 border-b px-6 py-4 @md:flex-row @md:items-center @md:justify-between",
      )}
    >
      <div className={cn("flex items-center gap-3")}>
        <div className={cn("relative")}>
          <Avatar size="lg">
            <AvatarImage src="/avatars/support.png" alt="AI Mine Hub Support" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <AvatarBadge className={cn("bg-green-500")} />
        </div>
        <div className={cn("flex flex-col")}>
          <h2 className={cn("font-brand-secondary text-sm font-semibold")}>
            AI Mine Hub Support
          </h2>
          <p className={cn("text-xs font-medium text-green-500")}>
            ● Online · Replies in minutes
          </p>
        </div>
      </div>

      <div
        className={cn(
          "divide-foreground/10 flex items-center divide-x text-center",
        )}
      >
        <div className={cn("px-4 first:pl-0")}>
          <div className={cn("text-xs font-semibold")}>~3 min</div>
          <div className={cn("text-foreground/50 text-2.5 uppercase")}>
            Avg Reply
          </div>
        </div>
        <div className={cn("px-4")}>
          <div className={cn("text-xs font-semibold")}>24/7</div>
          <div className={cn("text-foreground/50 text-2.5 uppercase")}>
            Available
          </div>
        </div>
        <div className={cn("px-4 last:pr-0")}>
          <div className={cn("text-xs font-semibold")}>98%</div>
          <div className={cn("text-foreground/50 text-2.5 uppercase")}>
            Satisfaction
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageList() {
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/(basic)/support-chat/",
  });

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteReadAllChats({
      identifier: { involvedUser: userId },
      limit: 20,
    });

  const { chatSocket, newMessages, setNewMessages } = useSocket();

  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldAutoScroll = useRef(true);
  const previousScrollHeight = useRef(0);
  const previousMessageCount = useRef(0);

  const serverMessages = useMemo(() => data?.pages.flat() ?? [], [data]);

  const messages = useMemo(() => {
    const unique = new Map<string, LocalMessage>();

    for (const message of [...serverMessages, ...newMessages]) {
      unique.set(message.id, message as LocalMessage);
    }

    return Array.from(unique.values()).sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }, [serverMessages, newMessages]);

  // Listen for real-time messages
  useEffect(() => {
    const handleNewMessage = ({ message }: any) => {
      const incomingMessage = message as LocalMessage;

      setNewMessages((previous) => {
        if (previous.some((item) => item.id === incomingMessage.id)) {
          return previous;
        }

        return [...previous, incomingMessage];
      });
    };

    chatSocket.on("new-message", handleNewMessage);

    return () => {
      chatSocket.off("new-message", handleNewMessage);
    };
  }, [chatSocket]);

  // Scroll to bottom only when appropriate
  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const isNewMessage = messages.length > previousMessageCount.current;

    if (shouldAutoScroll.current && isNewMessage) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }

    previousMessageCount.current = messages.length;
  }, [messages.length]);

  const handleScroll = async () => {
    const container = scrollRef.current;

    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    shouldAutoScroll.current = distanceFromBottom < 100;

    if (container.scrollTop > 50 || !hasNextPage || isFetchingNextPage) {
      return;
    }

    previousScrollHeight.current = container.scrollHeight;

    await fetchNextPage();

    requestAnimationFrame(() => {
      if (!container) return;

      container.scrollTop =
        container.scrollHeight - previousScrollHeight.current;
    });
  };

  const formatTime = (date: string | Date) =>
    new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

  const formatDate = (date: string | Date) => {
    const value = new Date(date);
    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (a: Date, b: Date) =>
      a.toDateString() === b.toDateString();

    if (isSameDay(value, today)) return "Today";
    if (isSameDay(value, yesterday)) return "Yesterday";

    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="flex h-120 flex-col gap-6 overflow-hidden p-6">
        {[100, 75, 85, 60].map((width, index) => (
          <div
            key={index}
            className={cn(
              "flex animate-pulse items-end gap-3",
              index % 2 === 0 ? "justify-end" : "justify-start",
            )}
          >
            {index % 2 !== 0 && (
              <div className="bg-muted size-9 shrink-0 rounded-full" />
            )}

            <div
              className="bg-muted h-16 rounded-2xl"
              style={{ width: `${width * 2}px` }}
            />

            {index % 2 === 0 && (
              <div className="bg-muted size-9 shrink-0 rounded-full" />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="border-foreground/10 relative border-b">
      {/* Chat background */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={cn(
          "h-120 overflow-y-auto overscroll-contain",
          "bg-background/40",
          "scrollbar-thumb-foreground/10 scrollbar-thin",
        )}
      >
        <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-6 p-4 @md:p-6">
          {/* Load older messages */}
          {hasNextPage && (
            <div className="flex justify-center">
              <button
                type="button"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition-colors"
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="size-3 animate-spin" />
                    Loading older messages...
                  </>
                ) : (
                  <>
                    <History className="size-3" />
                    Load previous messages
                  </>
                )}
              </button>
            </div>
          )}

          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
              <div className="bg-secondary-500/10 mb-4 flex size-16 items-center justify-center rounded-2xl">
                <MessageCircle className="text-secondary-500 size-7" />
              </div>

              <h3 className="font-brand-secondary text-base font-semibold">
                Start a conversation
              </h3>

              <p className="text-muted-foreground mt-1 max-w-xs text-sm">
                Have a question? Our support team is here to help you.
              </p>
            </div>
          ) : (
            messages.map((message, index) => {
              const isMine = message.senderId === userId;
              const previousMessage = messages[index - 1];

              const showDate =
                !previousMessage ||
                formatDate(previousMessage.createdAt) !==
                  formatDate(message.createdAt);

              return (
                <div key={message.id} className="flex flex-col gap-5">
                  {/* Date separator */}
                  {showDate && (
                    <div className="flex items-center gap-3 py-1">
                      <div className="bg-foreground/10 h-px flex-1" />

                      <span className="text-foreground/45 border-foreground/10 bg-background text-2.5 rounded-full border px-3 py-1 font-semibold tracking-wide uppercase">
                        {formatDate(message.createdAt)}
                      </span>

                      <div className="bg-foreground/10 h-px flex-1" />
                    </div>
                  )}

                  {/* Message */}
                  <Message
                    align={isMine ? "end" : "start"}
                    className="items-end gap-2"
                  >
                    <MessageAvatar>
                      <Avatar
                        size="sm"
                        className="border-foreground/10 size-8 border shadow-sm"
                      >
                        {isMine ? (
                          <>
                            <AvatarImage src="/avatars/10.png" alt="You" />
                            <AvatarFallback>ME</AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarImage
                              src="/avatars/support.png"
                              alt="Support"
                            />
                            <AvatarFallback>SP</AvatarFallback>
                          </>
                        )}
                      </Avatar>
                    </MessageAvatar>

                    <MessageContent className="max-w-[85%] gap-1 @md:max-w-[75%]">
                      <div
                        className={cn(
                          "mb-1 flex items-center gap-2 px-1",
                          isMine && "justify-end",
                        )}
                      >
                        <span className="text-foreground/65 text-2.75 font-semibold">
                          {isMine ? "You" : "AI Mine Hub Support"}
                        </span>
                      </div>

                      <Bubble
                        align={isMine ? "end" : "start"}
                        className={cn(
                          "rounded-2xl shadow-sm",
                          isMine
                            ? "bg-secondary-500 text-secondary-50 rounded-br-sm"
                            : "bg-card border-foreground/10 text-foreground rounded-bl-sm border",
                        )}
                      >
                        <BubbleContent className="px-4 py-3 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap">
                          {message.message}
                        </BubbleContent>
                      </Bubble>

                      <MessageFooter
                        className={cn(
                          "text-foreground/40 text-2.5 mt-1 px-1",
                          isMine && "justify-end",
                        )}
                      >
                        {formatTime(message.createdAt)}
                      </MessageFooter>
                    </MessageContent>
                  </Message>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
