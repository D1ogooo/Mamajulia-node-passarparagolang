import App from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import "../src/style/GlobalStyle";
import { Product } from "./pages/Product";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<Product />
		</ThemeProvider>
	</StrictMode>,
);
