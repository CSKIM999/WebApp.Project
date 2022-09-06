import { blue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
const bgColor = "#242424";
const ftColor = { main: "#cccccc", light: "#ffffff", dark: "#b3b3b3" }; //main-light-dark
const CardBgColor = "#333333";
const pointColor = "#FF8736";
const complementaryColor = "#02A9B3";

const overRideFontColor = (option) => ({
  styleOverrides: {
    root: {
      color: option + "!important",
    },
  },
});

export const globalTheme = createTheme({
  components: {
    // Name of the component

    // MuiTextField: overRideFontColor,
    // MuiFormLabel: overRideFontColor,
    // MuiDialog: overRideFontColor,
    // MuiDialogContentText: overRideFontColor,
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
        // today: {
        // },
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
        button: {
          color: ftColor.main,
        },
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
          color: blue[200],
        },
      },
    },
  },
  palette: {
    // primary: {},
    text: {
      primary: ftColor.main,
      secondary: ftColor.light,
      dark: bgColor,
    },
    background: {
      default: bgColor,
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
