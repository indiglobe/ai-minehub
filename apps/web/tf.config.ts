import { defineConfig } from "taskforge-cli/config";
import os from "node:os";

export default defineConfig({
  envDir: "../../",
  scripts: {
    "serve:app": {
      execute: "node dist/server/index.mjs",
      envFile: ".env.production",
    },
    "build:app": {
      execute: "vite build",
      envFile: ".env.production",
    },
    "dev:app": {
      execute: "vite dev",
      envFile:
        os.platform() === "linux" ? ".env.devcontainer" : ".env.development",
    },
    "sb:dev": {
      execute: "storybook dev -p 6007 --no-open",
      envFile:
        os.platform() === "linux" ? ".env.devcontainer" : ".env.development",
    },
    "sb:build": {
      execute: "storybook build",
      envFile: ".env.production",
    },
  },
});
