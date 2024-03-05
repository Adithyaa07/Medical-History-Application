import ReactDOM from "react-dom/client";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvide from "./components/ThemeProvide.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvide>
        <App />
      </ThemeProvide>
    </Provider>
  </PersistGate>
);
