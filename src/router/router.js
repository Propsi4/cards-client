import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { publicRoutes } from "./routes";
import ErrorPage from "../components/ErrorPage/ErrorPage";
const router = createBrowserRouter([
    {
        path:"/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            ...publicRoutes
        ]
    }]
)

export default router