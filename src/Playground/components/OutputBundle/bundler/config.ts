// TODO: a better way to config this
export const globalConfig = {
  esbuildWasmPath: "https://unpkg.com/esbuild-wasm@0.20.1",
};

export const setupEsbuild = (config: Partial<typeof globalConfig>) => {
  Object.assign(globalConfig, config);
};
