import { Playground, setup } from "code-kitchen";
import files from "./template/files";
import dependencies from "./dependencies";

import "code-kitchen/styles.css";
import "amis/lib/themes/cxd.css";

setup({
  esbuildWasmPath: "https://unpkg.com/esbuild-wasm@0.20.1",
  monacoEditorPath: "https://unpkg.com/monaco-editor@latest/min",
});

const customRequire = (key) => {
  const res = dependencies[key];

  if (res) {
    return res;
  }

  throw new Error("DEP: " + key + " not found");
};

const App = () => {
  return (
    <div>
      <Playground initialFiles={files} require={customRequire} />
    </div>
  );
};

export default App;
