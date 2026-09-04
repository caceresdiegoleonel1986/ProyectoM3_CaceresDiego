import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchGemini } from "../src/services/fetchGemini.js";

function jsonResponse(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 429 ? "Too Many Requests" : "Error",
    json: async () => body,
  };
}

describe("fetchGemini - reintentos automáticos en 429", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.useFakeTimers();
    global.fetch = vi.fn();
  });

  it("reintenta automáticamente tras un 429 y devuelve la respuesta si el segundo intento funciona", async () => {
    global.fetch
      .mockResolvedValueOnce(jsonResponse(429, { error: "Rate limit excedido", retryAfterSeconds: 2 }))
      .mockResolvedValueOnce(jsonResponse(200, { reply: "Hola de nuevo" }));

    const onRetry = vi.fn();
    const promise = fetchGemini([{ role: "user", content: "Hola" }], "homero", { onRetry });

    await vi.advanceTimersByTimeAsync(2000);
    const result = await promise;

    expect(result).toEqual({ reply: "Hola de nuevo" });
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(onRetry).toHaveBeenCalledWith({ attempt: 1, remaining: 2 });
    expect(onRetry).toHaveBeenCalledWith({ attempt: 1, remaining: 1 });
  });

  it("propaga el error 429 si se agotan los reintentos", async () => {
    global.fetch.mockResolvedValue(jsonResponse(429, { error: "Rate limit excedido", retryAfterSeconds: 1 }));

    const promise = fetchGemini([{ role: "user", content: "Hola" }], "homero", {});
    const assertion = expect(promise).rejects.toMatchObject({ status: 429 });

    await vi.runAllTimersAsync();
    await assertion;

    // 1 intento inicial + 2 reintentos = 3 llamadas
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it("no reintenta ante errores distintos de 429", async () => {
    global.fetch.mockResolvedValue(jsonResponse(500, { error: "Error interno" }));

    await expect(fetchGemini([{ role: "user", content: "Hola" }], "homero", {})).rejects.toMatchObject({
      status: 500,
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
