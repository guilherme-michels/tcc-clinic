import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";

import "./index.css";
import { Routes } from "./routes";
import { queryClient } from "./lib/react-query";
import { Toaster } from "./components/ui/toaster";

dayjs.locale({
  ...ptBr,
  weekStart: 1,
});

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
