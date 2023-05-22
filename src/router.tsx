import {createBrowserRouter} from "react-router-dom";
import StartPage from "./strartPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />
  },
  {
    path: '/:roomName',
    element: <StartPage />,
  },
])
export default router
