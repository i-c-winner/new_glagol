import {createBrowserRouter} from "react-router-dom";
import StartPage from "./startPage";
import ExitPage from "./components/ExitPage";

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
  }
])
export default router
