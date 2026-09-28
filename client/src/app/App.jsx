import { RouterProvider } from "react-router"
import router from "./app.routers"
import { AuthProvider } from "../modules/auth/context/authProvider"

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App