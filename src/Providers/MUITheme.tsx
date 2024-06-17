"use client";
import { prefixer } from "stylis";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { PropsWithChildren, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
export default function MUITheme({ children }: PropsWithChildren) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({
      key: "nuxino",
      stylisPlugins: [prefixer, stylisRTLPlugin],
    });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });
  return (
    <>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <html dir={theme.direction} lang="fa">
            <body>
              <CssBaseline />
              {children}
            </body>
          </html>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
