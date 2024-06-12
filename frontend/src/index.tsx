import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LangProvider } from "./LangProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <LangProvider>
    <App />
  </LangProvider>,
);
