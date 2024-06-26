import React, { useContext, useEffect, useState } from "react";
import { LangContext } from "./LangProvider";

const IpInput = (props: {
  fetch: (ip: string) => Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const ipRegex = new RegExp(
    /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/,
  );
  const i18n = useContext(LangContext);

  const [ip, setIp] = useState("");
  const [error, setError] = useState<string>();
  useEffect(() => {
    if (ip !== "" && !ipRegex.test(ip)) {
      setError(i18n.translate("invalidIP"));
    } else {
      setError(undefined);
    }
  }, [ip]);

  const loadFunc = () => {
    setLoading(true);
    props
      .fetch(ip)
      .catch((err) => setError(err.toString()))
      .finally(() => {
        setLoading(false);
      });
  };

  const disabled = error != null || loading;
  return (
    <div className="fit-content ip-input d-flex" style={{ height: "80%" }}>
      <div className="form-group fit-content h-100 align-content-center ">
        <div className="d-flex fit-content gap-16">
          <div>
            <label htmlFor="ip-address" className="ip-label">
              {i18n.translate("ip")}
            </label>
            <div className="gap-16 d-flex ip-form">
              <input
                className="form-control ip-address"
                id="ip-address"
                aria-describedby="IP-Address"
                placeholder={i18n.translate("leaveBlankForCurrentIP")}
                value={ip}
                onKeyDown={(evt) => {
                  if (evt.key === "Enter" && !disabled) {
                    loadFunc();
                  }
                }}
                onChange={(evt) => {
                  setIp(evt.target.value);
                }}
              />
              <button
                type="button"
                className="btn btn-primary locate"
                disabled={disabled}
                onClick={loadFunc}
              >
                {i18n.translate(loading ? "loading" : "locate")}
              </button>
            </div>

            <div className="text-danger helper">{error}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IpInput;
