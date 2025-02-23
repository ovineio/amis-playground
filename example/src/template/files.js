import App from "./App.tsx?raw";
import AppGlobalCss from "./app.global.css?raw";
import amisJson from "./amisJson.tsx?raw";
import env from "./env.tsx?raw";

const files = [
  {
    filename: "App.tsx",
    code: App,
  },
  {
    filename: "amisJson.tsx",
    code: amisJson,
  },
  {
    filename: "app.global.css",
    code: AppGlobalCss,
  },
  {
    filename: "env.tsx",
    code: env,
  },
 
];

export default files;
