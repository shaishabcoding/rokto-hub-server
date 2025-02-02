import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import { seedAdmin } from "./app/db";

const server: Server = app.listen(config.port, async () => {
  await mongoose.connect(config.db_url);
  await seedAdmin();
  console.log(`Server is listening on port ${config.port}`);
});

process.on("uncaughtException", ({ message, stack }: Error) => {
  console.error("🔥 Uncaught Exception detected:", message);
  console.error(stack);
  console.log("🔥 Shutting down due to uncaught exception...");
  process.exit(1);
});

process.on("unhandledRejection", ({ message, stack }: Error) => {
  console.error("🔥 Unhandled Rejection detected:", message);
  console.error(stack);
  console.log("🔥 Shutting down due to unhandled rejection...");
  server.close(() => {
    console.log("💀 Server closed. Exiting process...");
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("💥 SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("💀 Server closed. Exiting process...");
    process.exit(0);
  });
});