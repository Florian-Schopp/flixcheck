
import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../src/Header";
import { click } from "@testing-library/user-event/dist/click";
import { LangContext, LangProvider } from "../src/LangProvider";

describe("Header", () => {

    it("should render Header", async () => {
        render(<LangProvider><Header /></LangProvider>);
        screen.getByText("Contact")


    });

    it("should change language to german", async () => {
        const langMock = {
            language: "EN", updateLanguage: jest.fn(), translate: jest.fn()
        }
        render(<LangContext.Provider value={langMock}><Header /></LangContext.Provider>);
        await click(screen.getByText("DE |"))
        expect(langMock.updateLanguage).toHaveBeenCalledTimes(1)
        await click(screen.getByText("| EN"))
        expect(langMock.updateLanguage).toHaveBeenCalledTimes(2)


    });



});