import { beforeEach, describe, expect, it, vi } from "vitest";

const invokeMock = vi.fn();
const listenMock = vi.fn();

vi.mock("@tauri-apps/api/core", () => ({
  invoke: (...args: unknown[]) => invokeMock(...args),
}));

vi.mock("@tauri-apps/api/event", () => ({
  listen: (...args: unknown[]) => listenMock(...args),
}));

describe("guest-js API helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const globalWithWindow = globalThis as unknown as {
      window?: { btoa?: (s: string) => string; atob?: (s: string) => string }
    };
    globalWithWindow.window = {
      ...globalWithWindow.window,
      btoa: (str: string) => globalThis.btoa?.(str) ?? "",
      atob: (str: string) => globalThis.atob?.(str) ?? "",
    };
  });

  it("utils encode/decode and encodeJson/decodeJson roundtrip", async () => {
    const api = await import("../../guest-js/index");
    const encoded = api.utils.encode("hello");
    expect(encoded).toBe("aGVsbG8=");
    expect(api.utils.decode(encoded)).toBe("hello");

    const jsonEncoded = api.utils.encodeJson({ n: 1, s: "x" });
    expect(api.utils.decodeJson(jsonEncoded)).toEqual({ n: 1, s: "x" });
  });

  it("helpers.publishJson encodes payload and invokes publish command", async () => {
    invokeMock.mockResolvedValue(undefined);
    const api = await import("../../guest-js/index");

    await api.helpers.publishJson("news", { ok: true });
    expect(invokeMock).toHaveBeenCalledTimes(1);
    const [cmd, payload] = invokeMock.mock.calls[0];
    expect(cmd).toBe("plugin:centrifugo|publish");
    expect(payload.request.channel).toBe("news");
    expect(typeof payload.request.data).toBe("string");
  });

  it("helpers.publishRawJson uses rawJson encoding mode", async () => {
    invokeMock.mockResolvedValue(undefined);
    const api = await import("../../guest-js/index");

    await api.helpers.publishRawJson("chat", { msg: "hi" });
    const [cmd, payload] = invokeMock.mock.calls[0];
    expect(cmd).toBe("plugin:centrifugo|publish");
    expect(payload.request.channel).toBe("chat");
    expect(payload.request.dataEncoding).toBe("rawJson");
    expect(payload.request.data).toBe('{"msg":"hi"}');
  });

  it("helpers.rpcJson and rpcRawJson route through rpc invoke", async () => {
    invokeMock.mockResolvedValue(globalThis.btoa('{"ok":true}'));
    const api = await import("../../guest-js/index");
    const decoded = await api.helpers.rpcJson("m", { a: 1 });
    expect(decoded).toEqual({ ok: true });

    invokeMock.mockResolvedValue("raw-response");
    const raw = await api.helpers.rpcRawJson("m", { a: 1 });
    expect(raw).toBe("raw-response");
  });

  it("listener helper returns unlisten and cleanup works", async () => {
    const unlisten = vi.fn();
    listenMock.mockResolvedValue(unlisten);
    const api = await import("../../guest-js/index");
    const ret = await api.onPublication(() => {});
    expect(typeof ret).toBe("function");
    ret();
    expect(unlisten).toHaveBeenCalledTimes(1);
  });
});
