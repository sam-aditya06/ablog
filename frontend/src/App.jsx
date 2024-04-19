import axios from "axios";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/routes";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = "true";

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;