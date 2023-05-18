import {createBrowserRouter} from "react-router-dom";
import StartPage from "./strartPage";
import Room from "./components/room/Room";

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />
  },
  {
    path: '/:roomName',
    element: <Room/>,
  },
])
export default router
