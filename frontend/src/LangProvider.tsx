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

  const translate = (key: transKeys) => {
    const translations = translationKeys[language];
    if (translations && translations[key]) {
      return translations[key];
    }
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

export type transKeys =
  | "ip"
  | "invalidIP"
  | "leaveBlankForCurrentIP"
  | "locate"
  | "loading"
  | "status"
  | "country"
  | "countryCode"
  | "region"
  | "regionName"
  | "city"
  | "zip"
  | "lat"
  | "lon"
  | "timezone"
  | "isp"
  | "org"
  | "as"
  | "query"
  | "ipLocation";

const translationKeys: Record<string, Record<transKeys, string>> = {
  en: {
    ip: "IP Address",
    invalidIP: "Invalid IP",
    leaveBlankForCurrentIP: "Leave blank for current IP",
    locate: "Locate",
    ipLocation: "IP Location",
    loading: "Loading...",
    country: "Country",
    countryCode: "Country Code",
    region: "Region Code",
    regionName: "Region Name",
    city: "City",
    zip: "Zip",
    lat: "Latitude",
    lon: "Longitude",
    timezone: "Timezone",
    isp: "Internet Service Provider",
    org: "Organization",
    as: "AS",
    query: "IP Address",
    status: "Status",
  },
  de: {
    ip: "IP Addresse",
    invalidIP: "Ungültige IP",
    leaveBlankForCurrentIP: "Für aktuelle IP leer lassen",
    locate: "Orten",
    ipLocation: "IP Standort",
    loading: "Laden...",
    status: "Status",
    country: "Land",
    countryCode: "Ländercode",
    region: "Regionscode",
    regionName: "Region Name",
    city: "Stadt",
    zip: "Postleitzahl",
    lat: "Längengrad",
    lon: "Breitengrad",
    timezone: "Zeilzone",
    isp: "Internetdienstanbieter",
    org: "Organisation",
    as: "AS",
    query: "IP Addresse",
  },
};
