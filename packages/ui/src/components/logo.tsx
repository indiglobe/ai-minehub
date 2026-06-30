import { ComponentProps } from "react";

export function LogoIconFilled({ ...props }: ComponentProps<"svg">) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_175_2)">
        <path
          d="M36 0H12C5.37258 0 0 5.37258 0 12V36C0 42.6274 5.37258 48 12 48H36C42.6274 48 48 42.6274 48 36V12C48 5.37258 42.6274 0 36 0Z"
          fill="url(#paint0_linear_175_2)"
        />
        <path
          d="M12 33L21 15L27 25.5L31.5 19.5L36 33"
          stroke="white"
          strokeWidth="3.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_175_2"
          x1="0"
          y1="0"
          x2="1536"
          y2="1536"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--primary-500)" />
          <stop offset="1" stopColor="var(--primary-500)" />
        </linearGradient>
        <clipPath id="clip0_175_2">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function LogoIconOutlined({ ...props }: ComponentProps<"svg">) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_177_5)">
        <path
          d="M12 0.5H36C42.3513 0.5 47.5 5.64872 47.5 12V36C47.5 42.3513 42.3513 47.5 36 47.5H12C5.64872 47.5 0.5 42.3513 0.5 36V12C0.5 5.64872 5.64872 0.5 12 0.5Z"
          stroke="var(--primary-500)"
        />
        <path
          d="M12 33L21 15L27 25.5L31.5 19.5L36 33"
          stroke="var(--primary-500)"
          strokeWidth="3.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_177_5">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
