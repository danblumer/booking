import AppRoutes from "./Routes";
import { ThemeUIProvider } from "theme-ui";
import {
  createTheme as materialCreateTheme,
  THEME_ID,
  ThemeProvider as MaterialThemeProvider,
} from "@mui/material/styles";
import { BookingContextProvider } from "./provider/BookingContextProvider";

const themeUITheme = {
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace",
  },
  colors: {
    text: "#000",
    background: "#fbf8f1",
    primary: "#33e",
  },
};

function App() {
  const materialTheme = materialCreateTheme({
    typography: {
      fontFamily: [
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      ].join(','),
      fontSize: 12,
    },
  });

  return (
    <ThemeUIProvider theme={themeUITheme}>
      <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
        <BookingContextProvider>
          <AppRoutes />
        </BookingContextProvider>
      </MaterialThemeProvider>
    </ThemeUIProvider>
  );
}

export default App;
