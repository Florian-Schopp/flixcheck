import React, { createContext, useState } from "react";

// Define the initial language state
const initialLanguage = "en";

export type langCtx = {
  language: string;
  updateLanguage: (newLanguage: string) => void;
  translate(key: transKeys): string;
};

// Create the language context
export const LangContext = createContext<langCtx>({
  language: initialLanguage,
  updateLanguage: () => {},
  translate: () => "",
});

// Create the language provider component
export const LangProvider = (props: { children: React.ReactElement }) => {
  const [language, setLanguage] = useState<string>(initialLanguage);

  // Function to update the language
  const updateLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };
  // Function to translate the given key based on the current language
  const translate = (key: transKeys) => {
    const translations = translationKeys[language];
    if (translations && translations[key]) {
      return translations[key];
    }
    // Return the key itself if no translation is found
    return key;
  };

  const ctx: langCtx = {
    language,
    updateLanguage,
    translate,
  };

  return (
    <LangContext.Provider value={ctx}>{props.children}</LangContext.Provider>
  );
};

type transKeys =
  | "ip"
  | "invalidIP"
  | "leaveBlankForCurrentIP"
  | "locate"
  | "ipLocation";

const translationKeys: Record<string, Record<transKeys, string>> = {
  en: {
    ip: "IP Address",
    invalidIP: "Invalid IP",
    leaveBlankForCurrentIP: "Leave blank for current IP",
    locate: "Locate",
    ipLocation: "IP Location",
  },
  de: {
    ip: "IP Addresse",
    invalidIP: "Ungültige IP",
    leaveBlankForCurrentIP: "Für aktuelle IP leer lassen",
    locate: "Orten",
    ipLocation: "IP Standort",
  },
};
