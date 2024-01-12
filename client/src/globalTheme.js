import { createTheme } from "@mui/material/styles";
const bgColor = "#242424";
const ftColor = { main: "#cccccc", light: "#ffffff", dark: "#b3b3b3" }; //main-light-dark
const CardBgColor = "#333333";
const pointColor = "#FF8736";
const complementaryColor = "#02A9B3";

export const globalTheme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: bgColor,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          background: "#ea605d",
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: ftColor.main,
          borderColor: complementaryColor + "!important",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        caption: {
          color: ftColor.dark + "!important",
          fontSize: "0.9rem",
          fontStyle: "italic",
        },
        h5: {
          color: ftColor.light,
        },
        subtitle1: {
          color: ftColor.dark + "!important",
        },
        subtitle2: {
          color: bgColor + "!important",
        },
        body1: {
          color: ftColor.dark + "!important",
        },
        body2: {
          color: ftColor.light + "!important",
        },
        button: {
          color: ftColor.main,
        },
        // eslint-disable-next-line no-dupe-keys
        caption: {
          color: complementaryColor,
        },
      },
    },
    MuiPickersArrowSwitcher: {
      styleOverrides: {
        button: {
          color: ftColor.main + "!important",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: ftColor.dark,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: ftColor.dark,
          color: ftColor.dark,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          color: ftColor.main,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: CardBgColor,
        },
      },
    },
  },
  palette: {
    text: {
      primary: ftColor.main,
      secondary: ftColor.light,
      dark: bgColor,
    },
    background: {
      default: bgColor + "F0",
      paper: bgColor,
    },
    primary: {
      main: pointColor,
    },
    secondary: {
      main: complementaryColor,
      dark: "#ea605d!important",
    },
    info: {
      main: ftColor.dark,
    },
    error: {
      main: "#ea605d",
    },
    divider: bgColor,
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
