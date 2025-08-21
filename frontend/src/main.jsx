import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { AuthProvider } from "./context/authContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/App.css"


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <React.StrictMode>
      <App />
  </React.StrictMode>
  </AuthProvider>
)
