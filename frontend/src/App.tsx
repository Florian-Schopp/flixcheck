import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import { ScrollDown } from "./ScrollDown";
import { ScrollUp } from "./ScrollUp";
import { LangContext } from "./LangProvider";

type location = {
	lat: number;
	lon: number;
};
const App = () => {
	const i18n = useContext(LangContext);
	const APIKEY = "AIzaSyAwL1Rgymt_Xd6WuC1QW5m3EioJKMdVOKw";
	const [location, setLocation] = useState<location>();
	const [ip, setIp] = useState("");
	const [error, setError] = useState<string>();
	const ipRegex = new RegExp(
		/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/,
	);

	const locate = async () => {
		const url = new URL("http://localhost:4000/api/getLocation");
		url.searchParams.set("ip", ip);
		const res = await fetch(url);
		if (!res.ok) {
			return;
		}
		const jsonResponse = await res.json();
		setLocation(jsonResponse);
	};

	useEffect(() => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: "smooth",
		});
	}, [location]);

	useEffect(() => {
		if (ip !== "" && !ipRegex.test(ip)) {
			setError(i18n.translate("invalidIP"));
		} else {
			setError(undefined);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ip]);
	return (
		<>
			<div className="hero">
				<Header />

				<div className="fit-content ip-input d-flex" style={{ height: "80%" }}>
					<div className="form-group fit-content h-100 align-content-center ">
						<div className="d-flex fit-content gap-16">
							<div>
								<label htmlFor="ip-address" className="ip-label">
									{i18n.translate("ip")}
								</label>
								<div className="d-flex">
									<input
										className="form-control"
										id="ip-address"
										aria-describedby="IP-Address"
										placeholder={i18n.translate("leaveBlankForCurrentIP")}
										value={ip}
										onChange={(evt) => {
											setIp(evt.target.value);
										}}
									/>
									<button
										type="button"
										className="btn btn-primary"
										disabled={error != null}
										onClick={locate}
									>
										{i18n.translate("locate")}
									</button>
								</div>

								<div className="text-danger helper">{error}</div>
							</div>
						</div>
					</div>
				</div>
				{location ? (
					<button
						className="btn scrollDown"
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
