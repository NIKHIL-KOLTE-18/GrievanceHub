import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import Chatbot from "./pages/Chatbot"
import "./styles/App.css"

import { AuthProvider } from "./context/authContext"

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>

      <div className="App">
        <AppRoutes />
        <Chatbot />
      </div>
   
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
