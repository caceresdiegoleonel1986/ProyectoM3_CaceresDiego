import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom" // Simula DOM en Node
  }
});