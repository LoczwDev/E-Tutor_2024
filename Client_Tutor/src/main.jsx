import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { storePromise } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyToaster from "./components/toasterProvider/MyToaster.jsx";

const queryClient = new QueryClient();

const renderApp = async () => {
  const store = await storePromise;

  ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
          <MyToaster  />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
};

renderApp();
