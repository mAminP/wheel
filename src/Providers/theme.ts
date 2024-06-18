"use client";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { faIR } from "@mui/material/locale";
import { blueGrey, green, grey } from "@mui/material/colors";

export let theme = createTheme(
  {
    direction: "rtl",
    typography: {
      fontFamily: ["iranSans", "KALAMEH"].join(","),
      h1: {
        fontSize: "3rem",
        fontFamily: ["iranSans_Bold", "KALAMEH"].join(","),

        fontWeight: 600,
      },
      h2: {
        fontSize: "2rem",
        fontFamily: ["iranSans_Bold", "KALAMEH"].join(","),

        fontWeight: 600,
      },
      h3: {
        fontSize: "1.5rem",
        fontFamily: ["iranSans_Bold", "KALAMEH"].join(","),

        fontWeight: 600,
      },
      h4: {
        fontSize: "1.125rem",
        fontFamily: ["iranSans_Bold", "KALAMEH"].join(","),

        fontWeight: 600,
      },
      h5: {
        fontSize: "1rem",
        fontFamily: ["iranSans_Bold", "KALAMEH"].join(","),

        fontWeight: 600,
      },
      h6: {
        fontSize: "0.875rem",
        fontFamily: ["iranSans_Bold", "KALAMEH"].join(","),

        fontWeight: 600,
      },
      subtitle1: {
        fontSize: "1rem",
        fontFamily: ["iranSans_Bold", "KALAMEH"].join(","),

        fontWeight: 500,
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontFamily: ["iranSans_Bold", "KALAMEH"].join(","),

        fontWeight: 500,
      },
      body1: {
        fontSize: "1rem",
        fontFamily: ["iranSans_Medium", "KALAMEH"].join(","),

        fontWeight: 400,
      },
      body2: {
        fontSize: "0.875rem",
        fontFamily: ["iranSans", "KALAMEH"].join(","),
      },
      button: {
        fontSize: "0.875rem",
        fontFamily: ["iranSans", "KALAMEH"].join(","),
      },
      caption: {
        fontSize: "0.75rem",
        fontFamily: ["iranSans_Light", "KALAMEH"].join(","),
      },
      overline: {
        fontSize: "0.75rem",
        fontFamily: ["iranSans_UltraLight", "KALAMEH"].join(","),
        lineHeight: "1.4rem",
      },
    },
    palette: {
      primary: {
        main: "#0089ff",
      },
      error: {
        main: "#fa4d55",
      },
      warning: {
        main: "#ffc107",
      },
      success: {
        main: "#088b3d",
        contrastText: "#fff",
        "100": "#76f6a9",
        "200": "#b1fdcf",
      },
      secondary: {
        main: "#FFA726",
      },
      text: {
        primary: grey[800],
      },
      background: {
        default: "#fafafa",
      },
    },
  },
  faIR,
);

theme = responsiveFontSizes(theme);
