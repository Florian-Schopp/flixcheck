import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { ScrollDown } from "./ScrollDown";
import { ScrollUp } from "./ScrollUp";
import { LangContext } from "./LangProvider";
import IpInput from "./IpInput";

type location = {
  lat: number;
  lon: number;
};
const App = () => {
  const i18n = useContext(LangContext);
  const APIKEY = "AIzaSyAwL1Rgymt_Xd6WuC1QW5m3EioJKMdVOKw";
  const [location, setLocation] = useState<location>();

  const locate = async (ip: string) => {
    const url = new URL(`${window.location.href}api/getLocation`);
    url.searchParams.set("ip", ip);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Invalid IP");
    }
    const jsonResponse = await res.json();
    if (jsonResponse.status === "success") {
      setLocation(jsonResponse);
    } else {
      throw new Error("Invalid IP");
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <>
      <div className="hero">
        <Header />
        <IpInput fetch={locate} />
        {location ? (
          <button
            id="scroll-down"
            className="btn scroll-down"
            onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }}
          >
            <ScrollDown fill="inherit" width={48} height={48} />
          </button>
        ) : null}
      </div>
      {location ? (
        <div className="section">
          <div className="row justify-content-center m-0 mt-5 mb-5">
            <div className="col-md-7 text-center">
              <h3 className="display-4">{i18n.translate("ipLocation")}</h3>
            </div>
          </div>
          <div className="d-flex" style={{ gap: 64, justifyContent: "center" }}>
            <iframe
              title="map"
              width="800"
              height="700"
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/place?key=${APIKEY}&q=${location.lat},${location.lon}`}
            ></iframe>
            <table className="table table-striped" style={{ maxWidth: 600 }}>
              <tbody>
                {Object.entries(location).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="to-top m-4">
            <button
              id="scroll-up"
              className="btn"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <ScrollUp />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default App;
