import { createBrowserRouter } from "react-router-dom";
import StartPage from "./startPage";
import ExitPage from "./components/ExitPage";
import Whiteboard from "./components/whiteboard/Whiteboard";

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />
  },
  {
    path: '/:roomName',
    element: <StartPage />,
  },
  {
    path: '/exitPage',
    element: <ExitPage />
  },
  {
    path: "/whiteboard",
    element: <Whiteboard />
  }
])
export default router
