import Debug from "debug";
import React, { Component } from "react";

import { bundle } from "./bundle";
import { InputFile } from "./types";

const debug = Debug("bundler");

export const errorBoundary = (
  id: string,
  Element: React.ComponentType,
  errorCallback: (err: Error) => void
) => {
  return class ErrorBoundary extends Component {
    state = { error: null };
    componentDidCatch(error) {
      errorCallback(error);
    }

    static getDerivedStateFromError(error) {
      return { error };
    }

    render() {
      if (this.state.error) {
        return null;
      }
      return (
        <div className={id} style={{ display: "contents" }}>
          {typeof Element === "function" ? <Element /> : Element}
        </div>
      );
    }
  };
};

// TODO: use more formal (sandbox, e.g., ShadowRealm) solution instead?
export const evalCode = (code: string, scope: Record<string, any>) => {
  const scopeKeys = Object.keys(scope);
  const scopeValues = scopeKeys.map((key) => scope[key]);
  // eslint-disable-next-line no-new-func
  const res = new Function(...scopeKeys, code);
  return res(...scopeValues);
};

const generatePreviewComponent = (
  id: string,
  {
    input,
    scope = {},
  }: {
    input: string;
    scope: Record<string, any>;
  },
  errorCallback: (err: Error) => void
) => {
  try {
    const _module: any = {
      exports: {},
    };
    evalCode(input, {
      ...scope,
      exports: _module.exports,
      module: _module,
      React,
    });
    const El = _module.exports.default;
    return errorBoundary(id, El, errorCallback);
  } catch (err: any) {
    errorCallback(err);
  }
};

export const usePreviewComponent = (
  id: string,
  files: InputFile[],
  require: (key: string) => any
) => {
  const [bundling, setBundling] = React.useState(false);
  const [Preview, setPreview] = React.useState<any>(null);
  const [error, setError] = React.useState<any>(null);

  React.useEffect(() => {
    let canceled = false;
    const startTime = performance.now();
    setBundling(true);

    if (files.length) {
      (async () => {
        try {
          const bundledCode = await bundle(files, id);
          if (canceled || !bundledCode) {
            return;
          }
          setBundling(false);
          // There should be only one file after bundle though
          debug(
            `Bundled code in ${(performance.now() - startTime).toFixed()}ms: `,
            { bundledCode }
          );
          const El = generatePreviewComponent(
            id,
            {
              input: bundledCode,
              scope: { require },
            },
            setError
          );
          if (El) {
            setError(null);
            setPreview(() => El);
          }
        } catch (err) {
          if (canceled) {
            return;
          }
          setError(err);
        }
      })();
    }

    return () => {
      canceled = true;
    };
  }, [require, files, id]);

  React.useEffect(() => {
    return () => {
      document.querySelector(`[data-style-id="${id}"]`)?.remove();
    };
  }, [id]);

  return {
    Preview,
    bundling,
    error,
  };
};
