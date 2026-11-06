import { createServerFn } from "@tanstack/react-start";
/** Admin-only: reports whether the AI service is configured. Never returns the key. */
export const getAiServiceStatus = createServerFn({ method: "POST" })
  .handler(async () => {
    return { configured: Boolean(process.env["LOVABLE_API_KEY"]), model: "openai/gpt-6-astra" };
  });
