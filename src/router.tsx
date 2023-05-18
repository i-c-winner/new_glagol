import {createBrowserRouter} from "react-router-dom";
import StartPage from "./strartPage";
import CreatedRoom from "./components/room/CreatedRoom";

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
