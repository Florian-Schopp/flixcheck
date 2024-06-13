import React, { useContext } from "react";
import { renderHook, waitFor } from "@testing-library/react";

import { LangContext, LangProvider } from "../src/LangProvider";

describe("Language Context", () => {
  it("should return default context", async (): Promise<void> => {
    const wrapper = ({ children }) => children;
    const { result } = renderHook(() => useContext(LangContext), {
      wrapper,
    });
    expect(result.current.translate("invalidIP")).toEqual("");
    result.current.updateLanguage("EN");
    await waitFor(() => expect(result.current.language).toEqual("en"));
  });

  it("should return implemented context", async (): Promise<void> => {
    const wrapper = ({ children }) => <LangProvider>{children}</LangProvider>;
    const { result } = renderHook(() => useContext(LangContext), {
      wrapper,
    });
    expect(result.current.translate("invalidIP")).toEqual("Invalid IP");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(result.current.translate("invalidKey" as any)).toEqual("invalidKey");
    result.current.updateLanguage("EN");
    await waitFor(() => expect(result.current.language).toEqual("EN"));
    result.current.updateLanguage("DE");
    await waitFor(() => expect(result.current.language).toEqual("DE"));
  });
});
