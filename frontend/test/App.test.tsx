import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";
import { click } from "@testing-library/user-event/dist/click";
import { LangProvider } from "../src/LangProvider";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  it("should try invalid IP", async () => {
    window.scrollTo = jest.fn();
    render(
      <LangProvider>
        <App />
      </LangProvider>,
    );
    screen.getByText("Docs");
    fireEvent.change(screen.getByTestId("ip-address"), {
      target: { value: "8.8" },
    });
    await waitFor(() => screen.getByText("Invalid IP"));
  });

  it("should fail to fetch IP", async () => {
    window.scrollTo = jest.fn();
    window.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: Promise.resolve({
        lon: "",
        lat: "",
        city: "",
        region: "",
        postalCode: "foo",
        timezone: "",
        isp: "",
        ip: "",
      }),
    });
    render(<App />);
    screen.getByText("Docs");
    act(() => {
      fireEvent.change(screen.getByTestId("ip-address"), {
        target: { value: "8.8.8.8" },
      });
      fireEvent.click(screen.getByRole("button"));
    })
    expect(window.fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => screen.getByText("Error: Invalid IP"));
  });

  it("should fetch IP", async () => {
    window.scrollTo = jest.fn();
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: "success",
          lon: "12",
          lat: "12",
          city: "",
          region: "",
          postalCode: "foo",
          timezone: "",
          isp: "",
          ip: "",
        }),
    });
    render(<App />);
    const el = screen.getByTestId("ip-address")
    act(() => {
      userEvent.type(el, `8.8.8.8{enter}`);
    })
    expect(window.fetch).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getByText("foo"));
    click(screen.getByTestId("scroll-up"));
    expect(window.scrollTo).toHaveBeenCalledTimes(3);
    click(screen.getByTestId("scroll-down"));
    expect(window.scrollTo).toHaveBeenCalledTimes(4);
  });

  it("should fetch invalid IP", async () => {
    window.scrollTo = jest.fn();
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: "fail",
          lon: "12",
          lat: "12",
          city: "",
          region: "",
          postalCode: "foo",
          timezone: "",
          isp: "",
          ip: "",
        }),
    });
    render(<App />);
    screen.getByText("Docs");
    act(() => {
      fireEvent.change(screen.getByTestId("ip-address"), {
        target: { value: "8.8.8.8" },
      });
      fireEvent.click(screen.getByRole("button"));
    })

    expect(window.fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => screen.getByText("Error: Invalid IP"));
  });
});
